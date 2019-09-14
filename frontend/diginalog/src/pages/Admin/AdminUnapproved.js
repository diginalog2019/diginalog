import React,{Component} from "react";
//import axios from "axios";
import api from '../utils/api';
import './AdminProducts.module.scss'
import Pagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.css';
import {Route, Switch} from "react-router-dom";
// import View from "../hero/View";
// import Hero from "../hero/Hero";
import {connect} from "react-redux";
class AdminProducts extends Component {
  state = {
    pageSize: 10,
    totalCount: 100,
    currentPage: 1,
    products: [],
    changeStateProduct:0
  }

  componentDidMount() {
    this.getWaitingProducts();
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps:', newProps);
    this.getWaitingProducts();
  }

  getWaitingProducts = async () => {
    let response = await api.get(`/api/admin/waitingProducts?start_index=
      ${this.state.pageSize * (this.state.currentPage - 1)}&page_size=${this.state.pageSize}`);
    //console.log(response);
    this.setState({
      products: response.data.data,
      totalCount: response.data.total
    });
    //console.log(this.state);
  }

  onChange = (page) => {
    this.setState({currentPage: page}, () => {
      this.getWaitingProducts();
    });
  }

  handleClick = (event) => {
    // 상세보기 페이지로 넘기기
/*    console.log(event);
    event.preventDefault();
    this.props.history.push(`/admin/product/:id`);*/
  }

  handleSubmitClick = (event, id) =>{
    event.preventDefault();
    this.setState({changeStateProduct:id});
  }
  submit = (e) => {
    e.preventDefault();

    console.log(this.state.changeStateProduct);
    const sendForm = {pid:this.state.changeStateProduct, state:1};
    if (window.confirm('승인하시겠습니까?')) {
      api.put('/api/admin/setState', sendForm)
        .then(response => {
          console.log(response.data);
        });
      this.render();
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
              <th scope="col">PID</th>
              <th scope="col">상품명</th>
              <th scope="col">등록날짜</th>
              <th scope="col">가격</th>
              <th scope="col">확장자</th>
              <th scope="col">해상도</th>
              <th scope="col">별점</th>
              <th scope="col">디테일</th>
              <th scope="col">타이틀</th>
              <th scope="col">카테고리</th>
              <th scope="col">작가</th>
              <th scope="col">승인</th>
            </tr>
            </thead>
            <tbody>
            {this.state.products.map(product => (
              <tr>
                <th scope="row">{product.PID}</th>
                <td key={product.id} onClick={(e) => this.handleClick(e, product.id)} style={{cursor: 'pointer'}}>
                  {product.P_Name}</td>
                <td>{product.Date}</td>
                <td>{product.P_Price}</td>
                <td>{product.P_Extension}</td>
                <td>{product.P_Size}</td>
                <td>{product.P_StarPoint}</td>
                <td>{product.P_DetailIMG}</td>
                <td>{product.P_TitleIMG}</td>
                <td>{product.CateName}</td>
                <td>{product.CreatorName}</td>
                <div className="m-3 d-flex justify-content-center">
                  <form onSubmit={this.submit}>
                    <button type="submit" className="btn btn-outline-primary" onClick={(e) => this.handleSubmitClick(e, product.id)}>승인</button>
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

let mapStateToProps = (dispatch) => {
  // refreshList: () => dispatch(refreshList())
}

export default connect(null, mapStateToProps)(AdminProducts);