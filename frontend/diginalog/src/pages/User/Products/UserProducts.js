import React, {Component} from 'react';
import api from '../../utils/api'
import Pagination from "rc-pagination";
import 'rc-pagination/dist/rc-pagination.css';
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import Product from '../Product/Product';
import './UserProducts.module.scss';

class UserProducts extends Component {
    state = {
        pageSize:10,
        totalCount: 0,
        currentPage: 1,
        products: []
    }

    componentWillReceiveProps(newProps) {
        this.getProducts();
    }

    getProducts = async () => {
        let response = await api.get(`/api/user/products?start_index=
      ${this.state.pageSize * (this.state.currentPage - 1)}&page_size=${this.state.pageSize}`);
        this.setState({
            products: response.data.data,
            totalCount : response.data.total
        });
    }

    componentDidMount() {
        this.getProducts();
    }

    handleClick = (event, id) => {
        this.props.history.push(`/user/product?id=${id}`);
    }

    render() {
        return (
            <>
                <Switch>
                    <Route path="/user/product" component={Product}></Route>
                </Switch>
                <div className="container mt-4">
                <div className="row">
                        {this.state.products.map(product => (
                            <div className="col-lg-3 col-md-6 col-xs-1 mb-4">
                            <div className="card h-100" key={product.hero_id} onClick={(e) => this.handleClick(e, product.PID)} style={{cursor: 'pointer'}}>
                                {product.productTitle.length == 0 ?
                                    <img src = {process.env.PUBLIC_URL + '/images/baseline-face-24px.svg'} style={{width: '100%'}} ></img>
                                    :
                                    product.productTitle.map(file => (
                                        <img src = {file.F_Url=='error'? process.env.PUBLIC_URL + '/images/baseline-face-24px.svg':file.F_Url} style={{width: '100%'}}></img>
                                    ))
                                }
                                <div className="card-body">
                                    <h5 className="card-title">{product.P_Name}</h5>
                                    <p className="card-text">작가명: {product.CreatorName}</p>
                                    <p className="card-text">가격: {product.P_Price}</p>
                                    <p className="card-text">별점: {product.P_StarPoint}</p>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">#hashtag #example</small>
                                </div>
                            </div></div>
                        ))}
                </div>
                </div>
                <Pagination total={this.state.totalCount} current={this.state.currentPage} pageSize={this.state.pageSize} onChange={this.onChange} className="d-flex justify-content-center"/>
            </>
        )
    }
}

export default UserProducts;