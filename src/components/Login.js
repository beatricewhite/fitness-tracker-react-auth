import React, {Component}from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom'

export default class Login extends Component{
    state = {
        username: '',
        password: '',
        formErrors: {
            username: '',
            password: '',
        errorMessages: []
        }
    }

    handleSubmit= e => {
        e.preventDefault();
        const data = {
            username: this.username,
            password: this.password
        };

        axios.post('/users/login', data)
        .then(
            res => {
                console.log(res)
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('username', data.username);
                this.setState({
                    loggedIn: true
                });
                this.props.setUser(res.data.user);
            }
        ).catch(
            err => {
                this.setState({
                    message: err.response.data.message
                })
            }
        )
    };

    render() {
        if(this.state.loggedIn) {
            return <Redirect to={'/'} />;
        }

        let error = '';
        if (this.state.message) {
            error = (
                <div className="aler alert-danger" role="alert">
                    {this.state.message}
                </div>
            )
        }

        
        return (
            <form onSubmit={this.handleSubmit}>
            {error}
            <h3>Login</h3>

            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" placeholder="username"
                    onChange={e => this.username = e.target.value}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="password"
                onChange={e => this.password = e.target.value}/>
            </div>

            <button className="btn btn-primary btn-block">Login</button>
        </form>
        )
    }
}