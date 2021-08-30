import React, {Component} from 'react'
import axios from 'axios';

export default class Activities extends Component{
    state = {
        counter :0,
        activities: []
    }
    
    componentDidMount(){
        this.fetchActivities();
    }

    fetchActivities = async () => {
        await axios.get('/activities').then(
          ({ data }) => this.setState({ activities: data },
            err => console.log(err))
        )
      }


    printActivitiesAsRows = (activities = [], counter) => {
        let start_index = counter * 10;
        let posible_end_index = start_index + 10
        let end_index = (posible_end_index > activities.length) ? activities.length : posible_end_index;
        let activities_to_show = activities.slice(start_index, end_index)
        return activities_to_show.map((activity, index) => {
            return <tr>
                <td>{start_index +index + 1}</td>
                <td>{activity.name}</td>
                <td>{activity.description}</td>
                {this.showAddToRoutine(activity.id,this.props.addtoRoutine)}
            </tr>
        })
    }

    showAddToRoutine = (activity_id, routine_fn = false) => {
        if (routine_fn){
            return <>
            <td><input type="number" name="count" id="" onChange={e => this.props.setCount(e.target.value)}/></td>
            <td><input type="number" name="duration" id="" onChange={ e => this.props.setDuration(e.target.value)}/></td>
            <td><button className="btn btn-outline-primary btn-sm" onClick={()=> routine_fn(activity_id,this.props.count,this.props.duration)}>Add to Routine</button></td>
            </>
        }
    }
    goToActivitiesChunk = (navigation)=>{
        switch (navigation) {
            case 'first_chunk':
                this.setState({counter:0})
                break;
            case 'last_chunk':
                let last_chunck_index = Math.floor(this.state.activities.length/10)
                this.setState({counter:last_chunck_index})
                break;
        
            case 'next_chunk':
                    this.setState({
                        counter: this.state.counter+1
                    })
                    break;
            case 'prev_chunk':
                    this.setState({
                        counter: this.state.counter-1
                    })
                    break;
            default:
                break;
        }
    }
    
    render(){
        return (
            //all users can see this:
            <div className="activities_section">
                <h2 className='list-title'>Total Activities : {this.state.activities.length}</h2>

                <table className="activities_table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.printActivitiesAsRows(this.state.activities,this.state.counter)}
                    </tbody>

                    <tfoot className="d-flex">
                        <button className="btn btn-outline-success btn-sm" onClick={()=>this.goToActivitiesChunk('first_chunk')}>First</button>
                        <button className="btn btn-outline-success btn-sm" disabled={this.state.counter <=0} onClick={()=>this.goToActivitiesChunk('prev_chunk')}>Prev</button>
                        <button className="btn btn-outline-success btn-sm" disabled={this.state.counter >= Math.floor(this.state.activities.length/10)} onClick={()=>this.goToActivitiesChunk('next_chunk')}>Next</button>
                        <button className="btn btn-outline-success btn-sm" onClick={()=>this.goToActivitiesChunk('last_chunk')}>Last</button>
                        <button className="btn btn-outline-success btn-sm" onClick={()=>this.clearSelectedActivities()}>Clear</button>
                    </tfoot>


                </table>
                </div>
        )
    }
}