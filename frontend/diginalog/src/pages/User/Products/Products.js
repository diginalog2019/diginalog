import React, {Component} from 'react';
import api from '../../utils/api'
import Pagination from "rc-pagination";
import 'rc-pagination/dist/rc-pagination.css';
import {Route, Switch} from "react-router-dom";
import Product from '../Product/Product';
import './UserProducts.module.scss';
import ProductCard from './ProductCard';

class Products extends Component {
    state = {
        pageSize:10,
        totalCount: 0,
        currentPage: 1,
        params: "",
        products: []
    }

    getProducts = async () => {
        let response = await api.get('/api/user/products?',{
            params : {
                start_index : this.state.pageSize * (this.state.currentPage - 1),
                page_size : this.state.pageSize
            }
        });
        this.setState({
            products: response.data.data,
            totalCount : response.data.total
        });
    }

    componentDidMount() {
        this.getProducts();
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
                            <ProductCard history = {this.props.history}  PID = {product.PID} productTitle = {product.productTitle} P_Name = {product.P_Name} CreatorName = {product.CreatorName} P_Price = {product.P_Price} P_StarPoint = {product.P_StarPoint} hashtags = {product.hashtags} key = {product.PID}/>
                        ))}
                </div>
                </div>
                <Pagination total={this.state.totalCount} current={this.state.currentPage} pageSize={this.state.pageSize} onChange={this.onChange} className="d-flex justify-content-center"/>
            </>
        )
    }
}

export default Products;