import { Component } from "react";
import { getHeaders } from "..";
import axios from 'axios'

export default class AddActivity extends Component {
    state = {
        name: '',
        description: ''

    }

    clear = () => {
        //reset state
        this.setState({name: '',description: ''})
    }

    add = (data) => {
        axios.post('/activities', { ...data }, {
            headers: getHeaders(),

        }, () => {
            console.log('activity created')
            // this.clear();
        }, err => console.log(err))
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let { name, description } = this.state
        this.add({ name, description })
    }

    render(){
        return  <>
            <form onSubmit={this.handleSubmit}>
            <h3>Create New Activity</h3>

            <div className="form-group">
                <label>Activity</label>
                <input type="text" className="form-control" placeholder="Name"
                    onChange={e => this.setState({ name: e.target.value })} value={this.state.name}/>
            </div>

            <div className="form-group">
                <label>Description</label>
                <input type="text" className="form-control" placeholder="Description"
                onChange={e => this.setState({ description: e.target.value })} value={this.state.description}/>
            </div>

            <button className="btn btn-primary btn-block">Create</button>
        </form>
        </>
    }
}