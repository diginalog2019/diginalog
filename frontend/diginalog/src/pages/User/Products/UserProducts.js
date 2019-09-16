import React, {Component} from 'react';
import api from '../../utils/api'
import Pagination from "rc-pagination";
import 'rc-pagination/dist/rc-pagination.css';
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import Product from '../Product/Product';

class UserProducts extends Component {
    state = {
        pageSize:10,
        totalCount: 0,
        currentPage: 1,
        products: []
    }

    componentWillReceiveProps(newProps) {
        console.log('componentWillReceiveProps:', newProps);
        this.getProducts();
    }

    getProducts = async () => {
        let response = await api.get(`/api/user/products?start_index=
      ${this.state.pageSize * (this.state.currentPage - 1)}&page_size=${this.state.pageSize}`);
        console.log(response);
        this.setState({
            products: response.data.data,
            totalCount : response.data.total
        });
    }

    componentDidMount() {
        this.getProducts();
    }

    onChange = (page) => {
        this.setState({currentPage: page}, () => {
            this.getProducts();
        });
    }
    handleClick = (event, id) => {
        console.log("handleClick event");
        console.log(event, id);
        this.props.history.push(`/product?id=${id}`);
    }
    render() {
        return (
            <>
                <Switch>
                    <Route path="/product" component={Product}></Route>
                </Switch>
                <div className="card-deck">
                    {this.state.products.map(product => (

                        <div className="card" key={product.hero_id} onClick={(e) => this.handleClick(e, product.PID)} style={{cursor: 'pointer'}}>
                            <img src={product.P_TitleIMG ? "https://diginalog-s3.s3.ap-northeast-2.amazonaws.com/P_TitleIMG/"+product.PID+".png" : process.env.PUBLIC_URL + '/images/baseline-face-24px.svg'}
                                 style={{width: '100%'}} alt={product.name}></img>
                            <div className="card-body">
                                <h5 className="card-title">{product.P_Name}</h5>
                                <p className="card-text">작가명: {product.CreatorName}</p>
                                <p className="card-text">가격: {product.P_Price}</p>
                                <p className="card-text">별점: {product.P_StarPoint}</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">#hashtag #example</small>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination total={this.state.totalCount} current={this.state.currentPage} pageSize={this.state.pageSize} onChange={this.onChange} className="d-flex justify-content-center"/>
            </>
        )
    }
}

export default UserProducts;