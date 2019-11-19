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
import Products from "./Products";

class ViewHashtags extends Component {
    state = {
        hashtags: []
    }

    getHashtags = async () => {
        let response = await api.get('/api/user/hashtags');
        this.setState({
            hashtags : response.data.data
        });
        //this.props.getHashtags();
    }

    componentDidMount() {
        this.getHashtags();
    }


    handleClick = (event, id) => {
        this.props.history.push(`/user/productsByHashtag?hid=${id}`);
    }

    render () {
        return (
            <>
                <Switch>
                    <Route path="/user/product" component={Product}></Route>
                </Switch>
                <div className="container">
                    <div className="row">
                    </div>
                </div>
                <div className="container">
                    Hashtags<br />
                    {this.state.hashtags.map(hashtag => (
                        <button onClick={(e) => this.handleClick(e, hashtag.HID)} type="button" className="btn btn-outline-primary btn-sm">{hashtag.H_Name}({hashtag.total})</button>
                    ))}
                </div>
            </>
        )
    }
}

export default ViewHashtags;