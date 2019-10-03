import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';

export default class ggLogin extends Component {

  render() {
    const responseGoogle = (response) => {
      console.log(response);
    };
    return (
      <div className="App">
        <h3>LOGIN WITH GOOGLE</h3>
        <GoogleLogin
        clientId="195043205113-442eo17d9pnel0751u2cgd8h5fosnedi.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        />
      </div>
    )
  }
}
