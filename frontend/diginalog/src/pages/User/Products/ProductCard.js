import React, {Component} from 'react';
import api from '../../utils/api';
import {Route, Switch} from 'react-router-dom';
import {withRouter} from 'react-router';
import './UserProducts.module.scss';
import Product from "../Product/Product";

class ProductCard extends Component {

    constructor(props) {
        super(props);
    }

    handleClick = (event, id) => {
        this.props.history.push(`/user/product?id=${id}`);
    }

    render () {
        return (
            <>
                <div className="col-lg-3 col-md-6 col-xs-1 mb-4">
                    <div className="card h-100" onClick={(e) => this.handleClick(e, this.props.PID)} style={{cursor: 'pointer'}}>
                        {this.props.productTitle.length == 0 ?
                            <img src = {process.env.PUBLIC_URL + '/images/baseline-face-24px.svg'} style={{width: '100%'}} ></img>
                            :
                            this.props.productTitle.map(file => (
                                <img src = {file.F_Url=='error'? process.env.PUBLIC_URL + '/images/baseline-face-24px.svg':file.F_Url} style={{width: '100%'}}></img>
                            ))
                        }
                        <div className="card-body">
                            <h5 className="card-title">{this.props.P_Name}</h5>
                            <p className="card-text">작가명: {this.props.CreatorName}</p>
                            <p className="card-text">가격: {this.props.P_Price}</p>
                            <p className="card-text">별점: {this.props.P_StarPoint}</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">#hashtag #example</small>
                        </div>
                    </div></div>
            </>
        )
    }
}

let mapStateToProps = (state) => {

}
export default ProductCard;