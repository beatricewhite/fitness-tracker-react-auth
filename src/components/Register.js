import React, {Component} from 'react'
import axios from 'axios';
// import validate from './validateInfo'

export default class Register extends Component{
    handleSubmit= e => {
        e.preventDefault();
        const data = {
            username: this.username,
            password: this.password,
            password_confirm: this.confirmPassword
        };

        axios.post('/users/register', data)
        .then(
            res => {
                console.log(res)
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    };

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
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

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Confirm Password"
                    onChange={e => this.confirmPassword = e.target.value}/>
                </div>

                <button className="btn btn-primary btn-block">Sign Up</button>
            </form>
        )
    }
}