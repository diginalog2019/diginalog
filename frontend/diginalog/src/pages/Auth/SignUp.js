import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userPostFetch} from '../../redux/actions';

class SignUp extends Component {
    state = {
        id: "",
        password: "",
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.userPostFetch(this.state);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Sign Up For An Account</h1>

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
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    // 왼쪽은 props, 오른쪽은 store의 state
    id: state.id,
    password: state.password,
});

const mapDispatchToProps = dispatch => ({
    userPostFetch:(userInfo) => dispatch(userPostFetch(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);