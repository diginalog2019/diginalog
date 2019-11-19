import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userPostFetch} from '../../redux/actions';

class SignUp extends Component {
    state = {
        id: "",
        password: "",
    }

    handleChange = (e,key) => {
        this.setState({[key]: e.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.userPostFetch(this.state);
        // submit 후 폼에 있는 글 다 지워버리는거 해야함
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Enter your name" value={this.state.name}
                           onChange={(e) => this.handleChange(e, 'name')} required/>
                </div>

                <div className="form-group">
                    <label>ID</label>
                    <input type="text" className="form-control" placeholder="Enter ID" value={this.state.id}
                           onChange={(e) => this.handleChange(e, 'id')} required  />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={this.state.email}
                           onChange={(e) => this.handleChange(e, 'email')} required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={this.state.password}
                           onChange={(e) => this.handleChange(e, 'password')} required/>
                </div>

                <div className="form-group">
                    <label>Tel</label>
                    <input type="text" className="form-control" placeholder="Enter tel number" value={this.state.tel}
                           onChange={(e) => this.handleChange(e, 'tel')} required  />
                </div>

                <div className="form-group">
                    <label>Birthday</label>
                    <input type="text" className="form-control" placeholder="Enter your birth info" value={this.state.birth}
                           onChange={(e) => this.handleChange(e, 'birth')} required  />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form>
        );
    }
    }
    /*render() {
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
}*/

const mapStateToProps = (state) => ({
    // 왼쪽은 props, 오른쪽은 store의 state
    id: state.id,
    password: state.password,
});

const mapDispatchToProps = dispatch => ({
    userPostFetch:(userInfo) => dispatch(userPostFetch(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);