import React, {Component} from 'react';
import api from '../../utils/api'
import Pagination from "rc-pagination";
import 'rc-pagination/dist/rc-pagination.css';
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import Product from '../Product/Product';
import './UserProducts.module.scss';
import Hashtags from './Hashtags';
import ProductCards from './ProductCard';
import {getProducts, getHashtags} from "../../../redux/actions";
import {productsReducer} from "../../../redux/reducers/products";
import axios from 'axios';

class Products extends Component {
    state = {
        pageSize:10,
        totalCount: 0,
        currentPage: 1,
        params: "",
        products: []
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("in Products");
        console.log(nextProps.checkedHashtags);
        this.getProducts(nextProps.checkedHashtags);
    }

    getProducts = async (checkedHashtags) => {
        let response;
        console.log("getProducts");
        if(checkedHashtags.length == 0)
        {
            console.log("no hashtags");
            response = await api.get('/api/user/products?',{
                params : {
                    start_index : this.state.pageSize * (this.state.currentPage - 1),
                    page_size : this.state.pageSize
                }
            });
        }
        else
        {
            console.log("hashtags");
            response = await api.get('/api/user/productsByHashtags?',{
                params : {
                    start_index : this.state.pageSize * (this.state.currentPage - 1),
                    page_size : this.state.pageSize,
                    hashtags : checkedHashtags
                }
            })
        }
      //   let response = await api.get(`/api/user/products?start_index=
      // ${this.state.pageSize * (this.state.currentPage - 1)}&page_size=${this.state.pageSize}`);
        this.setState({
            products: response.data.data,
            totalCount : response.data.total
        });
        //this.props.getProducts(this.props.pageSize, this.props.currentPage);
    }

    componentDidMount() {
        this.getProducts([]);
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
                            <ProductCards history = {this.props.history}  PID = {product.PID} productTitle = {product.productTitle} P_Name = {product.P_Name} CreatorName = {product.CreatorName} P_Price = {product.P_Price} P_StarPoint = {product.P_StarPoint}/>
                        ))}
                </div>
                </div>
                <Pagination total={this.state.totalCount} current={this.state.currentPage} pageSize={this.state.pageSize} onChange={this.onChange} className="d-flex justify-content-center"/>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    //pageSize: state.productsReducer.pageSize,
    //totalCount: state.productsReducer.totalCount,
    //currentPage: state.productsReducer.currentPage,
    //products: state.productsReducer.products,
    //hashtags: state.productsReducer.hashtags,
    checkedHashtags: state.productsReducer.checkedHashtags
})

const mapActionToProps = (dispatch) => ({
    //getProducts : (pageSize, currentPage) => dispatch(getProducts(pageSize, currentPage)),
    //getHashtags : () => dispatch(getHashtags())
})

export default connect(mapStateToProps,mapActionToProps)(Products);