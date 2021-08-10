import React, {Component}from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom'

export default class Login extends Component{
    state = {};

    handleSubmit= e => {
        e.preventDefault();
        const data = {
            username: this.username,
            password: this.password
        };

        axios.post('https://fitnesstrac-kr.herokuapp.com/api/users/login', data)
        .then(
            res => {
                console.log(res)
                localStorage.setItem('token', res.data.token);
                this.setState({
                    loggedIn: true
                });
                this.props.setUser(res.data.user);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    };

    render() {
        if(this.state.loggedIn) {
            return <Redirect to={'/'} />;
        }
        return (
            <form onSubmit={this.handleSubmit}>
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