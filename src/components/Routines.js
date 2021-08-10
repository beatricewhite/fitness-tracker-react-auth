import React, {Component} from 'react'
// import axios from 'axios'
// import {Link} from 'react-router-dom'

export default class Routines extends Component{
        // state= {}
        handleSubmit= e => {
            e.preventDefault();
            const data = {
                name: this.name,
                goal: this.goal
            };
        }
        render()
        {
                //put this inside of create button with isLoggedIn condition
            //     return <form onSubmit={this.handleSubmit}>
            //     <h3>Create New Routine</h3>
    
            //     <div className="form-group">
            //         <label>Routine</label>
            //         <input type="text" className="form-control" placeholder="Routine Name"
            //             onChange={e => this.name = e.target.value}/>
            //     </div>
    
            //     <div className="form-group">
            //         <label>Goal</label>
            //         <input type="password" className="form-control" placeholder="Goal"
            //         onChange={e => this.goal = e.target.value}/>
            //     </div>
    
            //     <button className="btn btn-primary btn-block">Login</button>
            // </form>
        return (
            //all users can see this:
        <div>
            <h2 className='list-title'>Listed Routines</h2>
            <ul className="routines-list">
                <li className="routine-name">"Routine #1" - "goal" by "username"
                    <ul className="nested-items">
                        <li >"Activities" - "description" for "duration/count"
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        )
        
    }
}