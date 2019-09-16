import React,{Component} from "react";
//import axios from "axios";
import api from '../utils/api';
import './AdminCreators.module.scss'
import Pagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.css';
import {Route, Switch} from "react-router-dom";
// import View from "../hero/View";
// import Hero from "../hero/Hero";
import {connect} from "react-redux";
class AdminCreators extends Component {
  state = {
    pageSize: 10,
    totalCount: 100,
    currentPage: 1,
    creators: [],
    deleteCreator:0
  }

  componentDidMount() {
    this.getCreators();
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps:', newProps);
    this.getCreators();
  }

  getCreators = async () => {
    let response = await api.get(`/api/admin/creators?start_index=
      ${this.state.pageSize * (this.state.currentPage - 1)}&page_size=${this.state.pageSize}`);
    //console.log(response);
    this.setState({
      creators: response.data.data,
      totalCount: response.data.total
    });
    //console.log(this.state);
  }

  onChange = (page) => {
    this.setState({currentPage: page}, () => {
      this.getCreators();
    });
  }

  handleClick = (event, id) => {
    // console.log(event, id);
    // event.preventDefault();
    // this.props.history.push(`/product/${id}`);
  }

  handleChange = (event, id) =>{
    event.preventDefault();
    this.setState({deleteCreator:id});
  }

  handleDelete = (e) => {
    if (window.confirm('삭제하시겠습니까?')) {
      api.delete(`/api/admin/removeCreator?id=${this.state.deleteCreator}`)
        .then(response => {
          console.log(response.data);
          //this.props.history.push('/heroes/hero'); // this.props.router.push('/heroes/hero'); 3.0.0+

          // publish to parent
          //this.props.refreshHero();
        });
    }
  }

  render() {
    return (
      <>
        <Switch>
          {/*<Route path="/heroes/hero/:id" component={Hero}></Route>*/}
        </Switch>
        <div>
          <table className="table table-striped">
            <thead>
            <tr>
              <th scope="col">CID</th>
              <th scope="col">닉네임</th>
              <th scope="col">아이디</th>
              <th scope="col">이메일</th>
              <th scope="col">홈페이지</th>
              <th scope="col">삭제</th>
            </tr>
            </thead>
            <tbody>
            {this.state.creators.map(creator => (
              <tr>
                <th scope="row">{creator.CID}</th>
                <td key={creator.id} onClick={(e) => this.handleClick(e, creator.id)} style={{cursor: 'pointer'}}>
                  {creator.C_Nickname}</td>
                <td>{creator.C_ID}</td>
                <td>{creator.C_Email}</td>
                <td>{creator.C_Page}</td>
                <div className="m-3 d-flex justify-content-center">
                  <form onMouseEnter={(e) => this.handleChange(e, creator.CID)} onSubmit={(e) => this.handleDelete(e)}>
                    <button type="submit" className="btn btn-outline-danger ml-3" >삭제</button>
                  </form>
                </div>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <Pagination total={this.state.totalCount} current={this.state.currentPage} pageSize={this.state.pageSize}
                    onChange={this.onChange} className="d-flex justify-content-center"/>
      </>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    //refresh_count: state.heroReducer.refresh_count
  }
}

export default connect(mapStateToProps, null)(AdminCreators);