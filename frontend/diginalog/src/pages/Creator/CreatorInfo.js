import React,{Component} from 'react';
import api from '../utils/api';

class CreatorInfo extends Component {
  _isMounted = false;
  state = {
    filteredProducts: []
  };
  constructor(props) {
    super(props);
    console.log(this.props); // match.params: {id: "1"}
  }

  getCreatorInfo = async (creatorCID) => {
    let response = await api.get(`/api/creator/creatorsProduct/${creatorCID}`);
    console.log(response);
    if(this._isMounted) this.setState({filteredProducts: response.data});
  }
  componentDidMount() {
    console.log(this.props);
    this.getCreatorInfo(this.props.creatorCID);
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps', newProps);
    this.getCreatorInfo(newProps['creatorCID']);
  }
  render() {
    console.log(this.state.filteredProducts);
    return (
      <>
        <div className="card-columns">
          {this.state.filteredProducts.map(product => (
            <div className="card" key={product.PID}>
                <img src={product.P_TitleIMG ? product.P_TitleIMG : process.env.PUBLIC_URL + '/images/24px.svg'}
                     style={{width: '100%'}} alt={product.P_Name}></img>
                <div className="card-body">
                  <h5 className="card-title">{product.P_Name}</h5>
                  <p className="card-text">price: {product.P_Price}</p>
                  <p className="card-text">State: {product.State}</p>
                  <p className="card-text">creator: {product.creatorCID}</p>
                </div>
            </div>
          ))}
        </div>
      </>
    )
  }
}

export default CreatorInfo;
