import React, {Component} from 'react';
import "./Login.module.scss";
class Login extends Component {
  render() {
    return (
      <div>
        Login page
        <div>
          <a href="api/login/auth/naver">
            <img src="/images/naverLoginButton.PNG"/>
          </a>
        </div>
      </div>
    )
  }
}

export default Login;