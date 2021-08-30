import React, {Component} from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom'

export default class Register extends Component{
    state = {};
    handleSubmit= e => {
        e.preventDefault();
        const data = {
            username: this.username,
            password: this.password,
        };

        axios.post('/users/register', data)
        .then(
            res => {
                this.setState({
                    isRegistered: true
                })
                console.log(res)
            }
        ).catch(
            err => {
                this.setState({
                    message: err.response.data.message
                })
            }
        )
    };

    render(){
        if(this.state.isRegistered) {
            return <Redirect to={'/Login'} />;
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
                <h3>Sign Up</h3>
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

                <button className="btn btn-primary btn-block">Sign Up</button>
            </form>
        )
    }
}