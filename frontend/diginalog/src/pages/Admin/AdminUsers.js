import React,{Component} from "react";
//import axios from "axios";
import api from '../utils/api';
import './AdminUsers.module.scss';
import Pagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.css';
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
class AdminUsers extends Component {
  state = {
    pageSize: 10,
    totalCount: 100,
    currentPage: 1,
    users: [],
    deleteUser:0
  }

  componentDidMount() {
    this.getUsers();
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps:', newProps);
    this.getUsers();
  }

  getUsers = async () => {
    let response = await api.get(`/api/admin/users?start_index=
      ${this.state.pageSize * (this.state.currentPage - 1)}&page_size=${this.state.pageSize}`);
    //console.log(response);
    this.setState({
      users: response.data.data,
      totalCount: response.data.total
    });
    //console.log(this.state);
  }

  onChange = (page) => {
    this.setState({currentPage: page}, () => {
      this.getUsers();
    });
  }

  handleClick = (event, id) => {
    // console.log(event, id);
    // event.preventDefault();
    // this.props.history.push(`/product/${id}`);
  }

  handleChange = (event, id) =>{
    event.preventDefault();
    this.setState({deleteUser:id});
  }

  handleDelete = (e) => {
    if (window.confirm('삭제하시겠습니까?')) {
      api.delete(`/api/admin/removeUser?id=${this.state.deleteUser}`)
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
              <th scope="col">UID</th>
              <th scope="col">아이디</th>
              <th scope="col">이름</th>
              <th scope="col">이메일</th>
              <th scope="col">가입날짜</th>
              <th scope="col">연락처</th>
              <th scope="col">생년월일</th>
              <th scope="col">삭제</th>
            </tr>
            </thead>
            <tbody>
            {this.state.users.map(user => (
              <tr>
                <th scope="row">{user.UID}</th>
                <td key={user.id} onClick={(e) => this.handleClick(e, user.UID)} style={{cursor: 'pointer'}}>
                  {user.U_ID}</td>
                <td>{user.U_Name}</td>
                <td>{user.U_Email}</td>
                <td>{user.Date}</td>
                <td>{user.U_Tel}</td>
                <td>{user.U_Birth}</td>
                <div className="m-3 d-flex justify-content-center">
                  <form onMouseEnter={(e) => this.handleChange(e, user.UID)} onSubmit={(e) => this.handleDelete(e)}>
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

export default connect(mapStateToProps, null)(AdminUsers);