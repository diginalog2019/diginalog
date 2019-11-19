import React,{Component} from 'react';
import api from '../utils/api';
import {Route, Switch} from "react-router-dom";
import CreatorInfoDetail from "./CreatorInfoDetail";
import Pagination from "rc-pagination";
import 'rc-pagination/dist/rc-pagination.css';
import {connect} from "react-redux";

class CreatorInfo extends Component {
  /*---------Jang Jua 2019_09_07------------------------*/
  state = {
    pageSize: 6,
    totalCount: 100,
    currentPage: 1,
    total:100,
    filteredProducts:[],
  };

  constructor(props) {
    super(props);
  }

  handleClick = (event, id) => {
    console.log("handleClick event");
    this.props.history.push(`/Creator/product?id=${id}`);
  };

  getCreatorInfo = async (creatorCID) => {
    let response = await api.get(`/api/creator/creatorsProduct/${this.props.creatorCID}?start_index=
      ${this.state.pageSize * (this.state.currentPage - 1)}&page_size=${this.state.pageSize}`);
    this.setState({
      creatorCID:creatorCID,
      filteredProducts: response.data.data,
      totalCount: response.data.total,
    });
    console.log(this.state);
  };

  onChange = (page) => {
    this.setState({currentPage: page}, () => {
      this.getCreatorInfo();
    });
  }

  componentDidMount() {
    this.getCreatorInfo();
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps', newProps);
    //this.getCreatorInfo(newProps.match.params['creatorCID']);
    this.getCreatorInfo();
  }
  render() {
    return (
      <>
        <Switch>
          <Route path="/Creator/product" component={CreatorInfoDetail}></Route>
        </Switch>
        <div className="card-columns">
          {this.state.filteredProducts.map(product => (
            <div className="card" key={product.PID} onClick={(e) => this.handleClick(e, product.PID)} style={{cursor: 'pointer'}}>
              <img src={product.P_TitleIMG ? "https://diginalog-s3.s3.ap-northeast-2.amazonaws.com/P_TitleIMG/"+product.PID+".png" : process.env.PUBLIC_URL + '/images/baseline-face-24px.svg'}
                   style={{width: '100%'}} alt={product.name}></img>
              <div className="card-body">
                <div className="card-body">
                  <h5 className="card-title">{product.P_Name}</h5>
                  <p className="card-text">price: {product.P_Price}</p>
                  <p className="card-text">State: {product.State}</p>
                  <p className="card-text">creator: {product.creatorCID}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination total={this.state.totalCount} current={this.state.currentPage} pageSize={this.state.pageSize}
                    onChange={this.onChange} className="d-flex justify-content-center"/>
      </>
    )
  }
}
let mapStateToProps = (state) => {
  return {
    //refresh_count: state.heroReducer.refresh_count
  }
}

export default connect(mapStateToProps, null)(CreatorInfo);

