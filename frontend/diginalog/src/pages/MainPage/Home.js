import React, {Component} from 'react';
import Carousel from './Carousel';
import MainPageProducts from './MainPageProducts'
import './MainPage.module.scss'

class Home extends Component {
  state = {
    keyword:''
  }
  render() {
    return(
      <>
        <Carousel/>
        <div className="container">
          <div className="col-mx-auto mt-md-3">
              <h1>Best Items</h1>
          </div>
        </div>
        <MainPageProducts/>
      </>
    );
  }
}

export default Home;