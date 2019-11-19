import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProfileFetch, logoutUser, userLoginFetch} from '../../redux/actions';
import "./Auth.module.scss";

class Login extends Component {
    state = {
        id: "",
        password: "",
    }
    componentWillMount() {
        this.props.getProfileFetch();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('componentWillReceiveProps:', nextProps);
        //nextProps.getProfileFetch();
    }

    handleChange = (e,key) => {
        this.setState({[key]: e.target.value});
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.userLoginFetch(this.state)
    }

    handleClick = event => {
        event.preventDefault()
        // Remove the token from localStorage
        localStorage.removeItem("token")
        // Remove the user object from the Redux store
        this.props.logoutUser()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>ID</label>
                    <input type="text" className="form-control" placeholder="Enter ID" value={this.state.id}
                           onChange={(e) => this.handleChange(e, 'id')} required  />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={this.state.password}
                           onChange={(e) => this.handleChange(e, 'password')} required/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign In</button>

            </form>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo)),
    getProfileFetch: () => dispatch(getProfileFetch()),
    logoutUser: () => dispatch(logoutUser())
})

let mapStateToProps = (state) => {
    return {
        currentUser : state.authReducer.currentUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);