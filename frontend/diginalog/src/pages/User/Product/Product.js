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
        console.log(this.state);
    }

    // Kim Ju Hui : 2019.09.16 Mon --------------------------------------------------------
    viewPhoto() {
        let cnt = this.state.product.P_DetailIMG;

        if(cnt==1)
        {
            return(<img src={"https://diginalog-s3.s3.ap-northeast-2.amazonaws.com/P_DetailIMG/"+this.state.product.PID+".png"}style={{width: '100%'}} alt={this.state.product.P_Name}></img>);
        }
        else if(cnt >= 2)
        {
            return Array.from(Array(cnt), (e, i) => {
                console.log({i});
                console.log("https://diginalog-s3.s3.ap-northeast-2.amazonaws.com/P_DetailIMG/"+this.state.product.PID+"_"+(i+1)+".png");
                return(<img src={"https://diginalog-s3.s3.ap-northeast-2.amazonaws.com/P_DetailIMG/"+this.state.product.PID+"_"+(i+1)+".png"} style={{width:'100%'}} alt={this.state.product.P_Name}></img>);
            });
        }
        else
        {
            return(<p>no detailed image</p>);
        }
    }
    // Kim Ju Hui : 2019.09.16 Mon Fin-------------------------------------------------------------------------

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
                                <img src={this.state.product.P_TitleIMG ? "https://diginalog-s3.s3.ap-northeast-2.amazonaws.com/P_TitleIMG/"+this.state.product.PID+".png" : process.env.PUBLIC_URL + '/images/baseline-face-24px.svg'}
                                     style={{width: '100%'}} alt={this.state.product.P_Name}></img>
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
                                <a href="#" className="btn btn-secondary btn-lg active" role="button"
                                   aria-pressed="true">Download</a>
                                </div>
                            </div>
                            {this.viewPhoto()}
                        </div>

                    </form>
                </div>
                :
                ''
        )
    }
}

export default Product;