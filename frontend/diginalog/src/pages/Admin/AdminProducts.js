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
    totalCount: 115,
    currentPage: 1,
    products: []
  }

  componentDidMount() {
    this.getProducts();
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps:', newProps);
    this.getProducts();
  }

  getProducts = async () => {
    let response = await api.get(`/api/admin/products?start_index=
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
      this.getProducts();
    });
  }

  handleClick = (event, id) => {
    console.log(event, id);
    event.preventDefault();
    this.props.history.push(`/heroes/hero/${id}`);
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
              <th scope="col">디테일이미지</th>
              <th scope="col">타이틀이미지</th>
              <th scope="col">카테고리</th>
              <th scope="col">작가</th>
            </tr>
            </thead>
            <tbody>
              {this.state.products.map(product => (
                    <tr key={product.id} onClick={(e) => this.handleClick(e, product.id)} style={{cursor: 'pointer'}}>
                      <th scope="row">{product.PID}</th>
                      <td>{product.P_Name}</td>
                      <td>{product.P_Date}</td>
                      <td>{product.P_Price}</td>
                      <td>{product.P_Extension}</td>
                      <td>{product.P_Size}</td>
                      <td>{product.P_StarPoint}</td>
                      <td>{product.P_DetailIMG}</td>
                      <td>{product.P_TitleIMG}</td>
                      <td>{product.CateName}</td>
                      <td>{product.CreatorName}</td>
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

export default connect(mapStateToProps, null)(AdminProducts);