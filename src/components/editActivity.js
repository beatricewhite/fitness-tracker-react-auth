import { Component } from "react";
import { getHeaders } from "..";
import axios from 'axios';

export default class EditActivity extends Component {

    state = {
        duration: '',
        count: '',

    }

    clear = () => {
        //reset state
        this.setState({duration: '', count: ''})
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let { duration, count} = this.state
        this.edit({ duration, count })
        
    }

    edit = (id) => {
        axios.patch('/routine_activities/' + id, {
            headers: getHeaders(),

        }, () => {
            console.log('routine_activity edited')

        }, err => console.log(err))
    }

    updateIsPublic = (state) => {
        this.setState({ isPublic: state })
    }

    render() {
        return <>
            <form onSubmit={this.handleSubmit}>
                <h3>Edit This Routine</h3>

                <div className="form-group">
                    <label>New Name</label>
                    <input type="text" className="form-control" placeholder="New Name"
                        onChange={e => this.setState({ name: e.target.value })} value={this.state.name}/>
                </div>

                <div className="form-group">
                    <label>New Goal</label>
                    <input type="text" className="form-control" placeholder="New Goal"
                        onChange={e => this.setState({ goal: e.target.value })} value={this.state.goal}/>
                </div>

                <button className="btn btn-primary btn-block">Edit</button>
            </form>


        </>
    }
}