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

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
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
                <h1>Login</h1>

                <label>ID</label>
                <input
                    name='id'
                    placeholder='ID'
                    value={this.state.id}
                    onChange={this.handleChange}
                /><br/>

                <label>Password</label>
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={this.state.password}
                    onChange={this.handleChange}
                /><br/>

                <input type='submit'/>

                {this.props.currentUser.id
                    ? <button onClick={this.handleClick}>Log Out</button>
                    : null
                }

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