import React, { Component } from 'react';
import axios from 'axios';
import { getHeaders } from '../index'
import AddRoutine from './addroutine';
import AddActivity from './addactivity';
export default class Home extends Component {

    state = {
        canShowAddActivity: false,
        canShowAddRoutine: false
    }

    componentDidMount() {

        axios.get('/users/me', { headers: getHeaders() })

            .then(
                res => {
                    console.log(res);
                    // add user to localstorage if not there already
                    if (!localStorage.getItem('username')){
                        localStorage.setItem('username',res.data.username)
                    }
                    this.setState({
                        user: res.data
                    });
                },
                err => {
                    console.log(err)
                }
            )
    }

    showAddActivity = (can_show) => {
        this.setState({ canShowAddRoutine: false, canShowAddActivity:can_show})
    }

    showAddRoutine =  (can_show) => {
        this.setState({ canShowAddRoutine: can_show, canShowAddActivity:false})
       
    }

    shouldShowAddRoutine = ( can_show) => {
        if (this.state.canShowAddRoutine){
           return <AddRoutine></AddRoutine>
        }
    }

    shouldShowAddActivity = ( can_show) => {
        if (this.state.canShowAddActivity){
           return <AddActivity></AddActivity>
        }
    }

render() {
    if (this.props.user) {
        return (
            <>
                <div className='home__actions'>
                    <h2>Hello {this.props.user.username}</h2>
                    <button className='btn btn-primary btn-sm' onClick={()=>this.showAddRoutine(!this.state.canShowAddRoutine)}>Add Routine</button>
                    <button className='btn btn-primary btn-sm' onClick={()=> this.showAddActivity(!this.state.canShowAddActivity)}>Add Activity</button>
                </div>
                <div className="home__contents">
                    {this.shouldShowAddRoutine(this.state.canShowAddRoutine)}
                    {this.shouldShowAddActivity(this.state.canShowAddActivity)}
                </div>
            </>
        )
    }
    return (
        <h2>You are not logged in</h2>
    )
}
}



