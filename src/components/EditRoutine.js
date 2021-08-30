import { Component } from "react";
import { getHeaders } from "..";
import axios from 'axios';

// export default class EditRoutine extends Component {

//     state = {
//         canShowEditRoutine: false,
//         name: '',
//         goal: '',

//     }

//     showEditRoutine =  (can_show) => {
//         this.setState({ canShowEditRoutine: can_show })
       
//     }

//     shouldShowEditRoutine = (can_show) => {
//         if (this.state.canShowEditRoutine){
//            return <EditRoutine></EditRoutine>
//         }
//     }

//     clear = () => {
//         //reset state
//         this.setState({name: '',goal: ''})
//     }

//     handleSubmit = (event) => {
//         event.preventDefault();

//         let { name, goal} = this.state
//         this.edit({ name, goal })
        
//     }

//     edit = (id) => {
//         axios.patch('/routines/' + id, {
//             headers: getHeaders(),

//         }, () => {
//             console.log('routine edited')

//         }, err => console.log(err))
//     }

//     updateIsPublic = (state) => {
//         this.setState({ isPublic: state })
//     }

//     render() {
//         return <>
//             <div className="editing">
//             <form onSubmit={this.handleSubmit}>
//             {this.shouldShowEditRoutine(this.state.canShowEditRoutine)}
//                 <h3>Edit This Routine</h3>

//                 <div className="form-group">
//                     <label>New Name</label>
//                     <input type="text" className="form-control" placeholder="New Name"
//                         onChange={e => this.setState({ name: e.target.value })} value={this.state.name}/>
//                 </div>

//                 <div className="form-group">
//                     <label>New Goal</label>
//                     <input type="text" className="form-control" placeholder="New Goal"
//                         onChange={e => this.setState({ goal: e.target.value })} value={this.state.goal}/>
//                 </div>

//                 <button className="btn btn-primary btn-block">Edit</button>
//             </form>
//             </div>


//         </>
//     }
// }

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

    // getOriginalRoutine(){
    //     let routineId = this.params.id;
    //     axios.get(`users/routines/${routineId}`, {headers: getHeaders()}).then(response => {
    //         this.setState({
    //             id: response.data.id,
    //             name: response.data.name,
    //             goal: response.data.goal
    //         }, () => {
    //             console.log(this.state)
    //         })
    //     }).catch(err => console.log(err));
    // }


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