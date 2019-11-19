import React, {Component} from 'react';
import api from '../../utils/api'
import Pagination from "rc-pagination";
import 'rc-pagination/dist/rc-pagination.css';
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import Product from '../Product/Product';
import './UserProducts.module.scss';
import ProductCard from './ProductCard';
import queryString from "query-string";

class ProductsByHashtag extends Component {
    state = {
        pageSize:10,
        totalCount: 0,
        currentPage: 1,
        hid : -1,
        hashtag : "",
        products: []
    }

    getProducts = async (id) => {
        let response = await api.get('/api/user/productsByHashtag?',{
            params : {
                start_index : this.state.pageSize * (this.state.currentPage - 1),
                page_size : this.state.pageSize,
                hid : id
            }
        });
        this.setState({
            hid : response.data.data.HID,
            hashtag: response.data.data.H_Name,
            products: response.data.data.products,
            totalCount : response.data.total
        });
    }

    componentDidMount() {
        let params = queryString.parse(this.props.location.search);
        this.getProducts(params.hid);
        console.log(this.state);
    }

    render() {
        return (
            <>
                <Switch>
                    <Route path="/user/product" component={Product}></Route>
                </Switch>
                {"products with #"+this.state.hashtag}
                <div className="container mt-4">
                    <div className="row">
                        {this.state.products.map(product => (
                            <ProductCard history = {this.props.history}  PID = {product.PID} productTitle = {product.productTitle} P_Name = {product.P_Name} CreatorName = {product.CreatorName} P_Price = {product.P_Price} P_StarPoint = {product.P_StarPoint} hashtags = {product.hashtags} key = {product.PID}/>
                        ))}
                    </div>
                </div>
                <Pagination total={this.state.totalCount} current={this.state.currentPage} pageSize={this.state.pageSize} onChange={this.onChange} className="d-flex justify-content-center"/>
            </>
        )
    }
}

export default ProductsByHashtag;