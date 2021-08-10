import React, {Component} from 'react';
import axios from 'axios';

export default class Home extends Component{

    state= {}
    componentDidMount() {

        axios.get('/users/me').then(
            res => {
                console.log(res);
                this.setState({
                    user: res.data
                });
            },
            err => {
                console.log(err)
            }
        )
    }
    
    render(){
        if(this.props.user) {
            return (
                <h2>Hello {this.props.user.username}</h2>
            )
        }
        return (
            <h2>You are not logged in</h2>
        )
    }
}