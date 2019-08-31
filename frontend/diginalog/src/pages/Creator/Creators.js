import React,{Component} from 'react';
import api from '../utils/api';
import './Creators.module.scss';
import Pagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.css';
import {Route, Switch} from "react-router-dom";


class Creators extends Component {
  state = {
    pageSize: 10,
    totalCount: 115,
    currentPage: 1,
    product: []
  }
  componentDidMount() {
    this.getCreators();
  }
  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps:', newProps);
    this.getCreators();
  }
  getCreators = async() => {
    let response = await api.get(`/api/creator/creators?start_index=
      ${this.state.pageSize * (this.state.currentPage - 1)}&page_size=${this.state.pageSize}`);
    this.setState({
      product: response.data.data,
      totalCount: response.data.total
    });
  }
  render() {
    return (
      <div>
        Creator
        <div className="card-columns">
        {this.state.product.map(product => (
          <div className="card" key={product.creatorCID}>
            <div className="card" key={product.creatorCID}>
              <img src={product.P_TitleIMG ? product.P_TitleIMG : process.env.PUBLIC_URL + '/images/24px.svg'}
                   style={{width: '100%'}} alt={product.P_Name}></img>
              <div className="card-body">
                <h5 className="card-title">{product.P_Name}</h5>
                <p className="card-text">price: {product.P_Price}</p>
                <p className="card-text">creator: {product.creatorCID}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
        <Pagination total={this.state.totalCount} current={this.state.currentPage} pageSize={this.state.pageSize}
                    onChange={this.onChange} className="d-flex justify-content-center"/>
      </div>
    )
  }
}



export default Creators;