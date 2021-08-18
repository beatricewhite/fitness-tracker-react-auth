import { Component } from "react";
import { getHeaders } from "..";
import axios from 'axios';
// import { Redirect } from "react-router-dom";

export default class AddRoutine extends Component {

    state = {
        name: '',
        goal: '',
        isPublic: false

    }

    clear = () => {
        //reset state
        this.setState({name: '',goal: '',isPublic: false})
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let { name, goal, isPublic } = this.state
        this.add({ name, goal, isPublic })
        
    }

    add = (data) => {
        axios.post('/routines', { ...data }, {
            headers: getHeaders(),

        }, () => {
            console.log('routine created')
            // this.clear();
        }, err => console.log(err))
    }

    updateIsPublic = (state) => {
        this.setState({ isPublic: state })
    }

    render() {
        return <>
            <form onSubmit={this.handleSubmit}>
                <h3>Create New Routine</h3>

                <div className="form-group">
                    <label>Routine Name</label>
                    <input type="text" className="form-control" placeholder="Name"
                        onChange={e => this.setState({ name: e.target.value })} value={this.state.name}/>
                </div>

                <div className="form-group">
                    <label>Goal</label>
                    <input type="text" className="form-control" placeholder="Goal"
                        onChange={e => this.setState({ goal: e.target.value })} value={this.state.goal}/>
                </div>
                <div className="form-group">


                    <label for="isPublic">isPublic</label>
                    <input type="checkbox" id='isPublic'
                        onChange={e => this.updateIsPublic(!this.state.isPublic)} value={this.state.isPublic}/>
                </div>

                <button className="btn btn-primary btn-block">Create</button>
            </form>


        </>
    }
}