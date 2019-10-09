import React, {Component} from 'react';
import api from '../../utils/api';
import queryString from 'query-string';
import {Nav, NavItem} from "reactstrap";
import {NavLink} from "react-router-dom";

class Product extends Component {
    componentDidMount() {
        let params = queryString.parse(this.props.location.search);
        console.log(params);
        this.getProduct(params.id);
    }

    getProduct = async (id) => {
        let response = await api.get(`/api/user/product?id=${id}`);
        console.log("id = "+id);
        console.log(response);

        this.setState({product: response.data.data});
        console.log("this.state = ");
        console.log(this.state);
    }

    handleClick = async(event) => {
        console.log("handleClick event");
        console.log(event);

        let fileName = this.state.product.productFile.F_Name;
        let fileExtension = this.state.product.productFile.F_Extension;
        let fileType = this.state.product.productFile.F_Type;
        let response = await api.get(`/api/user/download?fileName=${fileName}&fileExtension=${fileExtension}&fileType=${fileType}`);
        window.location.href = response.data;
    }

    constructor(props) {
        super(props);
        this.state = {
            product : null
        }
        console.log(this.props); // match.params: {id: "1"}
    }

    render(){
        return (
                this.state.product ?
                <div>
                    <Nav className={"mb-3"}>
                        <NavItem>
                            <NavLink to="/user/products" className="nav-link">대분류 ></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/user/test" className="nav-link">중분류 ></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/user/test" className="nav-link">소분류</NavLink>
                        </NavItem>
                    </Nav>
                    <h3>{this.state.product.P_Name}</h3>
                    <form>
                        <div className="form-group row">
                            <div className="col-md-6">
                                {this.state.product.productTitle.length == 0 ?
                                    <img src = {process.env.PUBLIC_URL + '/images/baseline-face-24px.svg'} style={{width: '100%'}} ></img>
                                    :
                                    this.state.product.productTitle.map(file => (
                                        <img src = {file.F_Url=='error'? process.env.PUBLIC_URL + '/images/baseline-face-24px.svg':file.F_Url} style={{width: '100%'}}></img>
                                    ))
                                }
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="creatorNickname" className="col-sm-2 col-form-label">작가명</label>
                                <div className="col-sm-10">
                                    <p className="form-control form-control-sm" id="email">{this.state.product.creator["C_Nickname"]}</p>
                                </div>
                                <label htmlFor="creatorNickname" className="col-sm-2 col-form-label">확장자</label>
                                <div className="col-sm-10">
                                    <p className="form-control form-control-sm" id="email">{this.state.product.P_Extension}</p>
                                </div>
                                <label htmlFor="creatorNickname" className="col-sm-2 col-form-label">별점</label>
                                <div className="col-sm-10">
                                    <p className="form-control form-control-sm" id="email">{this.state.product.P_StarPoint}</p>
                                </div>
                                <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="email" className="form-control" id="inputEmail" placeholder="diginalog2019@gmail.com"></input>
                                </div>
                                <label htmlFor="inputEmail" className="col-sm-2 col-form-label"></label>
                                <div className="col-sm-10">
                                    <a class="btn btn-primary" onClick={(e) => this.handleClick(e)} role="button" style={{cursor: 'pointer'}}>download</a>
                                </div>
                            </div>
                            {this.state.product.productDetail.length == 0 ?
                                <img src = {process.env.PUBLIC_URL + '/images/baseline-face-24px.svg'} style={{width: '100%'}} ></img>
                                :
                                this.state.product.productDetail.map(file => (
                                    <img src = {file.F_Url=='error'? process.env.PUBLIC_URL + '/images/baseline-face-24px.svg':file.F_Url} style={{width: '100%'}}></img>
                                ))
                            }
                        </div>

                    </form>
                </div>
                :
                ''
        )
    }
}

export default Product;