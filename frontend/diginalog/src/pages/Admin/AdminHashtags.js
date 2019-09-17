import React,{Component} from "react";
//import axios from "axios";
import api from '../utils/api';
//import './AdminCreators.module.scss'
import Pagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.css';
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
class AdminHashtags extends Component {
  state = {
    pageSize: 10,
    totalCount: 100,
    currentPage: 1,
    hashtags: [],
    deleteHashtag:0
  }

  componentDidMount() {
    this.getHashtags();
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps:', newProps);
    this.getHashtags();
  }

  getHashtags = async () => {
    let response = await api.get(`/api/admin/hashtags?start_index=
      ${this.state.pageSize * (this.state.currentPage - 1)}&page_size=${this.state.pageSize}`);
    console.log(response);
    this.setState({
      hashtags: response.data.data,
      totalCount: response.data.total
    });
    //console.log(this.state);
  }

  onChange = (page) => {
    this.setState({currentPage: page}, () => {
      this.getHashtags();
    });
  }

  handleClick = (event, id) => {
    // console.log(event, id);
    // event.preventDefault();
    // this.props.history.push(`/product/${id}`);
  }

  handleChange = (event, id) =>{
    event.preventDefault();
    this.setState({deleteHashtag:id});
  }

  handleDelete = (e) => {
    if (window.confirm('삭제하시겠습니까?')) {
      api.delete(`/api/admin/removeHashtag?id=${this.state.deleteHashtag}`)
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
              <th scope="col">HID</th>
              <th scope="col">해시태그명</th>
              <th scope="col">삭제</th>
            </tr>
            </thead>
            <tbody>
            {this.state.hashtags.map(hashtag => (
              <tr>
                <th scope="row">{hashtag.HID}</th>
                <td key={hashtag.id} onClick={(e) => this.handleClick(e, hashtag.HID)} style={{cursor: 'pointer'}}>
                  {hashtag.H_Name}</td>
                <div className="m-3 d-flex justify-content-center">
                  <form onMouseEnter={(e) => this.handleChange(e, hashtag.HID)} onSubmit={(e) => this.handleDelete(e)}>
                    <button type="submit" className="btn btn-outline-danger ml-3" >삭제</button>
                  </form>
                </div>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div>
          {this.state.hashtags.map(hashtag => (
            <a href="#" className="badge badge-secondary"> {hashtag.H_Name} </a>
          ))}
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

export default connect(mapStateToProps, null)(AdminHashtags);