import React,{Component} from 'react';
import api from '../utils/api';
import {Route, Switch} from "react-router-dom";
import CreatorInfoDetail from "./CreatorInfoDetail";

class CreatorInfo extends Component {
  /*---------Jang Jua 2019_09_07------------------------*/
  state = {
    pageSize:10,
    totalCount: 0,
    currentPage: 1,
    filteredProducts:[],
  };
  constructor(props) {
    super(props);
    console.log(this.props); // match.params: {id: "1"}
  }

  handleClick = (event, id) => {
    console.log("handleClick event");
    this.props.history.push(`/Creator/SearchCreators/product?id=${id}`);
  };

  getCreatorInfo = async (creatorCID) => {
    console.log(this.props.creatorCID);
    console.log("creatorCID" + creatorCID);
    let response = await api.get(`/api/creator/creatorsProduct/${creatorCID}`);
    console.log(response);
    this.setState({creatorCID:creatorCID});
    this.setState({filteredProducts: response.data});
  };

  componentDidMount() {
    console.log(this.props);
    this.getCreatorInfo(this.props.creatorCID);
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps', newProps);
    //this.getCreatorInfo(newProps.match.params['creatorCID']);
    this.getCreatorInfo(newProps['creatorCID']);
  }
  render() {
    return (
      <>
        <Switch>
          <Route path="/Creator/SearchCreators/product" component={CreatorInfoDetail}></Route>
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
      </>
    )
  }
}

export default CreatorInfo;
