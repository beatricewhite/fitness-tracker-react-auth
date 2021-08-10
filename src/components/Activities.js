import React, {Component} from 'react'

export default class Activities extends Component{
    
    render(){

    //     return <form onSubmit={this.handleSubmit}>
    //     <h3>Create New Activity</h3>

    //     <div className="form-group">
    //         <label>Activity</label>
    //         <input type="text" className="form-control" placeholder="Name"
    //             onChange={e => this.name = e.target.value}/>
    //     </div>

    //     <div className="form-group">
    //         <label>Goal</label>
    //         <input type="password" className="form-control" placeholder="Description"
    //         onChange={e => this.description = e.target.value}/>
    //     </div>

    //     <button className="btn btn-primary btn-block">Login</button>
    // </form>
        return (
            //all users can see this:
            <div>
            <h2>Activities created</h2>
            <ul>
                <li> Activity #1</li>
                <li> Activity #2</li>
            </ul>
            </div>
        )
    }
}