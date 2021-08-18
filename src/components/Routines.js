import React, { Component } from 'react'
import axios from 'axios'
import { getHeaders } from '..'
// import {Link} from 'react-router-dom'

export default class Routines extends Component {
    state = {
        counter: 0,
        selectedActivities: null,
        routines: []
    }


    componentDidMount() {
        this.fetchRoutines()
    }
    clearSelectedActivities = () => {
        this.setState({
            selectedActivities: null
        })
    }

    fetchRoutines = async () => {
        await axios.get('/routines').then(
            ({ data }) => this.setState({ routines: data },
                err => console.log(err))
        )
    }


    removeRoutine = (id) => {
        axios.delete('/routines/' + id,{headers: getHeaders()})
        .then(() => {
            this.setState({ routines: this.state.routines.filter(routine => routine.id !== id) })
        })
        .catch(err => console.log(err))

    }

    removeRoutineActivity = (id) => {
        axios.delete('/routine_activities/:routineActivityId' + id,{headers: getHeaders()})
        .then(() => {
            this.setState({ selectedActivities: this.state.selectedActivities.filter(activity => activity.id !== id) })
        })
        .catch(err => console.log(err))

    }

    editRoutine = (id) => {
        axios.patch('/routines/' + id, {headers: getHeaders()} )
        .then(() => {
            this.setState({ routines: this.state.routines.filter(routine => routine.id !== id) })
        })
        .catch(err => console.log(err))
    }

    setSelectedActivities = (activities) => {
        this.setState({ selectedActivities: activities })
    }
    printRoutinesAsRows = (routines = [], counter) => {
        let start_index = counter * 10;
        let posible_end_index = start_index + 10
        let end_index = (posible_end_index > routines.length) ? routines.length : posible_end_index;
        let routines_to_show = routines.slice(start_index, end_index)
        return routines_to_show.map((routine, index) => {
            return <tr>
                <td>{start_index + index + 1}</td>
                <td>{routine.name}</td>
                <td>{routine.goal}</td>
                <td><button className="btn btn-primary" onClick={() => this.setSelectedActivities(routine.activities)}>{routine.activities.length}</button></td>
                <td>{routine.creatorName}</td>
                <td><button onClick={() => this.removeRoutine(routine.id)} className="btn btn-primary btn-sm">Delete</button> </td>
            </tr>
        })
    }
    
    printActivitiesAsRows = () => {
        return this.state.selectedActivities.map((activity, index) => {
            return <tr>
                <td>{index + 1}</td>
                <td>{activity.name}</td>
                <td>{activity.description}</td>
                <td>{activity.duration}</td>
            </tr>
        })
    }

    goToRoutineChunk = (navigation) => {
        switch (navigation) {
            case 'first_chunk':
                this.setState({ counter: 0 })
                break;
            case 'last_chunk':
                let last_chunck_index = Math.floor(this.state.routines.length / 10)
                this.setState({ counter: last_chunck_index })
                break;

            case 'next_chunk':
                this.setState({
                    counter: this.state.counter + 1
                })
                break;
            case 'prev_chunk':
                this.setState({
                    counter: this.state.counter - 1
                })
                break;
            default:
                break;
        }
    }

    render() {
        if(this.state.selectedActivities) {
            return (
                <div>
                    <h1>This Routine's Activities</h1>
                    <table className="routine_activities_table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Duration</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.printActivitiesAsRows(this.state.selectedActivities)}
                    </tbody>
                </table>
                    <button className="btn btn-outline-success btn-sm" onClick={this.clearSelectedActivities}>Go Back</button>
                    
                </div>
            )
        }
        return (
            <div className="routines_section">
                <h2 className='list-title'>Total Routines : {this.state.routines.length}</h2>

                <table className="routines_table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Goal</th>
                            <th>Activities #</th>
                            <th>Creator</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.printRoutinesAsRows(this.state.routines, this.state.counter)}
                    </tbody>

                    <tfoot className="d-flex">
                        <button className="btn btn-outline-success btn-sm" onClick={() => this.goToRoutineChunk('first_chunk')}>First</button>
                        <button className="btn btn-outline-success btn-sm" disabled={this.state.counter <= 0} onClick={() => this.goToRoutineChunk('prev_chunk')}>Prev</button>
                        <button className="btn btn-outline-success btn-sm" disabled={this.state.counter >= Math.floor(this.state.routines.length / 10)} onClick={() => this.goToRoutineChunk('next_chunk')}>Next</button>
                        <button className="btn btn-outline-success btn-sm" onClick={() => this.goToRoutineChunk('last_chunk')}>Last</button>
                        <button className="btn btn-outline-success btn-sm" onClick={() => this.clearSelectedActivities()}>Clear</button>
                    </tfoot>
                </table>

            </div>)

    }


}