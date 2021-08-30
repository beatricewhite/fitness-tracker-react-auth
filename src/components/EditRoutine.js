import { Component } from "react";
import { getHeaders } from "..";
import axios from 'axios';

export default class EditRoutine extends Component {
    state = {
        id: '',
        name: '',
        goal: '',
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const newRoutine = {
            name: this.state.name,
            goal: this.state.goal
        }
        this.editRoutine(newRoutine).then(() => this.props.clearEditRoutine(this.state.name, this.state.goal))
    }

    editRoutine(newRoutine) {
        return axios.patch(`/routines/${this.state.id}`, newRoutine, {
                        headers: getHeaders()
                    }, () => {
                        console.log('routine edited')
                    }, err => console.log(err))
    }

    componentWillMount() {
        // this.getOriginalRoutine();


    }

    componentDidMount() {
        this.setState({
            id: this.props.routine.id,
            name: this.props.routine.name,
            goal: this.props.routine.goal
        })
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