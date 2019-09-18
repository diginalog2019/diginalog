import React,{Component} from 'react';
import api from '../utils/api';
import './Creators.module.scss';
import Pagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.css';
import CreatorInfo from './CreatorInfo';
import CreatorInfoDetail from "./CreatorInfoDetail";
import {Route, Switch} from "react-router-dom";

class SearchCreators extends Component {
  /*---------Jang Jua 2019_09_07------------------------*/
  _isMounted = false;
  state = {
    pageSize: 10,
    totalCount: 115,
    currentPage: 1,
    products: {
      P_Name:'',
      P_Price:'',
      creatorCID:'',
      State:''
    },
    creators:{
      C_ID: '',
      CID:''
    },
    keyword:'',
    filteredProducts: {
      P_Name:'',
      P_Price:'',
      creatorCID:'',
      State:''
    },
    initialState: false,
    index:-1,
  };

  componentDidMount() {
    this._isMounted = true;
    this.getCreatorsInfo();
  }
  componentWillReceiveProps(newProps) {
    this._isMounted = false;
    console.log('componentWillReceiveProps:', newProps);
    this.getCreatorsInfo();
  }
  getCreatorsInfo = async() => {
    let response = await api.get(`/api/creator/creatorsInfo`);
    if(this._isMounted){
      this.setState({
        creators: response.data.data
      });
    }
  };

  search = (e) => {
    e.preventDefault();
    let find = this.state.creators.findIndex(creator => (
      creator.C_ID === this.state.keyword
    ));
    console.log(find);
    this.setState({index:find});
  };
  handleText = (e, key) => {
    this.setState({[key]: e.target.value});
  };
  handleSearchMode = () => {
    this.setState({initialState: true});
  };

  render() {
    return (
      <>
        <form onSubmit={this.search}>
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Enter Creator's ID" id="C_ID"
                   value={this.state.keyword} onChange={(e) => this.handleText(e, 'keyword')} required minLength="3" maxLength="10"/>
              <div className="input-group-append">
                <button type="search" className="btn btn-outline-secondary" onClick={this.handleSearchMode}>SEARCH</button>
              </div>
          </div>
        </form>
        {
          this.state.initialState ? this.state.index!==-1 ? <CreatorInfo creatorCID={this.state.index+1} history={this.props.history}/>
            : "일치하는 ID가 없습니다."
            : " "
        }
        <Pagination total={this.state.totalCount} current={this.state.currentPage} pageSize={this.state.pageSize}
                    onChange={this.onChange} className="d-flex justify-content-center"/>
      </>
    )
  }
}



export default SearchCreators;