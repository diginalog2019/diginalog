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
import AdminProduct from "./AdminProduct";
import {getProfileFetch} from '../../redux/actions';
class AdminProducts extends Component {
  state = {
    pageSize: 10,
    totalCount: 100,
    currentPage: 1,
    products: [],
    deleteProduct:0,
  }

  componentDidMount() {
    //this.props.getProfileFetch();
    this.getProducts();
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps:', newProps);
    this.getProducts();
  }
/*  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if()
    this.getProducts();
    return nextProps.currentuser !== this.props.currentUser;
  }*/

  getProducts = async () => {
    let token = localStorage.token;
    //console.log(token);
    let response = await api.get(`/api/admin/products?start_index=
      ${this.state.pageSize * (this.state.currentPage - 1)}&page_size=${this.state.pageSize}&token=${token}`);
    console.log(response);
    this.setState({
      products: response.data.data,
      totalCount: response.data.total
    });
    console.log(this.state);
  }

  onChange = (page) => {
    this.setState({currentPage: page}, () => {
      this.getProducts();
    });
  }

  handleClick = (event, id) => {
    // console.log(event, id);
    // event.preventDefault();
    console.log(this.props);
    this.props.history.push(`/admin/product?id=${id}`);
  }

  handleChange = (event, id) =>{
    event.preventDefault();
    this.setState({deleteProduct:id});
  }

  handleDelete = (e) => {
    if (window.confirm('삭제하시겠습니까?')) {
      api.delete(`/api/admin/removeProduct?id=${this.state.deleteProduct}`)
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
        {/*<Switch>
          <Route path="/admin/user/:id" component={AdminProduct}></Route>
        </Switch>*/}
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
              {/*<th scope="col">디테일</th>
              <th scope="col">타이틀</th>*/}
              <th scope="col">카테고리</th>
              <th scope="col">작가</th>
              <th scope="col">상태</th>
              <th scope="col">삭제</th>
            </tr>
            </thead>
            <tbody>
              {this.state.products.map(product => (
                <tr>
                  <th scope="row">{product.PID}</th>
                  <td key={product.id} onClick={(e) => this.handleClick(e, product.PID)} style={{cursor: 'pointer'}}>
                    {product.P_Name}</td>
                  <td>{product.Date}</td>
                  <td>{product.P_Price}</td>
                  <td>{product.P_Extension}</td>
                  <td>{product.P_Size}</td>
                  <td>{product.P_StarPoint}</td>
                 {/* <td>{product.P_DetailIMG}</td>
                  <td>{product.P_TitleIMG}</td>*/}
                  <td>{product.CateName}</td>
                  <td>{product.CreatorName}</td>
                  <td>{product.StateName}</td>
                  <div className="m-3 d-flex justify-content-center">
                    <form onMouseEnter={(e)=>this.handleChange(e, product.PID)} onSubmit={(e) => this.handleDelete(e)}>
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
    currentUser : state.authReducer.currentUser
  }
}
const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);
//export default connect(mapStateToProps, null)(AdminProducts);