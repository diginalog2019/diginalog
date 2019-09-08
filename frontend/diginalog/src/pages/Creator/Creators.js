import React,{Component} from 'react';
import api from '../utils/api';
import './Creators.module.scss';
import Pagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.css';

class Creators extends Component {
  state = {
    pageSize: 10,
    totalCount: 115,
    currentPage: 1,
    product: [],
    creators:{
      C_ID: '',
      CID:'',
    },
    keyword:'',
    initialState: false,
    isFind: false
  }

  componentDidMount() {
    this.getCreatorsInfo();
  }
  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps:', newProps);
    this.getCreatorsInfo();
  }
  getCreatorsInfo = async() => {
    let response = await api.get(`/api/creator/creatorsInfo?start_index=
      ${this.state.pageSize * (this.state.currentPage - 1)}&page_size=${this.state.pageSize}`);
    this.setState({
      creators: response.data.data
    });
  };
  search = (e) => {
    e.preventDefault();
    console.log('search');
    let find = this.state.creators.find(creator => (
      creator.C_ID === this.state.keyword
    ));
    console.log(find);
    this.setState({isFind: find !== undefined});
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
        <p>
          {this.state.C_ID}
        </p>
        {
          this.state.initialState ? this.state.isFind ? "Found" : "Not Found" : " "
        }
      {/*  <div className="card-columns">*/}
      {/*  {this.state.product.map(product => (*/}
      {/*    <div className="card" key={product.creatorCID}>*/}
      {/*      <div className="card" key={product.creatorCID}>*/}
      {/*        <img src={product.P_TitleIMG ? product.P_TitleIMG : process.env.PUBLIC_URL + '/images/24px.svg'}*/}
      {/*             style={{width: '100%'}} alt={product.P_Name}></img>*/}
      {/*        <div className="card-body">*/}
      {/*          <h5 className="card-title">{product.P_Name}</h5>*/}
      {/*          <p className="card-text">price: {product.P_Price}</p>*/}
      {/*          <p className="card-text">creator: {product.creatorCID}</p>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}
        <Pagination total={this.state.totalCount} current={this.state.currentPage} pageSize={this.state.pageSize}
                    onChange={this.onChange} className="d-flex justify-content-center"/>
      </>
    )
  }
}



export default Creators;