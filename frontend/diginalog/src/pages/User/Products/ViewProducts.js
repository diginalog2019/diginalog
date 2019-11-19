import React, {Component} from 'react';
import api from '../../utils/api'
import Pagination from "rc-pagination";
import 'rc-pagination/dist/rc-pagination.css';
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import Product from '../Product/Product';
import './UserProducts.module.scss';
import Products from "./Products";

class ViewProducts extends Component {

    componentWillReceiveProps(newProps) {
    }


    componentDidMount() {
    }

    render() {
        return (
            <>
                <Switch>
                    <Route path="/user/product" component={Product}></Route>
                </Switch>
                <div className="container mt-4">
                <div className="row">
                   <Products history = {this.props.history}  />
                </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    // pageSize: state.productsReducer.pageSize,
    // totalCount: state.productsReducer.totalCount,
    // currentPage: state.productsReducer.currentPage,
    // products: state.productsReducer.products,
    // hashtags: state.productsReducer.hashtags,
    // checkedHashtags: state.productsReducer.checkhashtag
})

const mapActionToProps = (dispatch) => ({
    //getProducts : (pageSize, currentPage) => dispatch(getProducts(pageSize, currentPage)),
    //getHashtags : () => dispatch(getHashtags())
})

export default connect(mapStateToProps,mapActionToProps)(ViewProducts);