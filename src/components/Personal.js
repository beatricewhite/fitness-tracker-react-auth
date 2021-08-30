import React, { Component } from "react";
import axios from "axios";
import { getHeaders } from "..";
import Activities from "./Activities";
import EditRoutine from "./EditRoutine";

export default class Personal extends Component {
  state = {
    counter: 0,
    routineActivities: [],
    routines: [],
    selected_routine_id: null,
    editingRoutine: false,
    selectedRoutine: {},
    count: null,
    duration: null,
    showEditRoutine: false,
    canShowEditRoutine: true,
  };

  componentDidMount() {
    this.fetchRoutines();
  }
  clearRoutineActivities = () => {
    this.setState({
      routineActivities: null,
    });
  };

  handleEditRoutine(routineId) {
      console.log("routineId", routineId)
    this.setState((prevState) => ({
        ...prevState, 
        editingRoutine: true,
        selectedRoutine: prevState.routines.find(routine => routine.id === routineId)
    }))
  }

  clearEditRoutine = (name, goal) => {
      this.setState((prevState) => ({
        ...prevState,
        routines: prevState.routines.map( routine => routine.id === prevState.selectedRoutine.id ? {id: prevState.selectedRoutine.id, name, goal, activities: prevState.selectedRoutine.activities,} : routine),
        editingRoutine: false,
        selectedRoutine: {},
      }))
  }

  fetchRoutines = async () => {
    let username = localStorage.getItem("username");
    await axios
      .get(`users/${username}/routines`)
      .then(({ data }) =>
        this.setState({ routines: data }, (err) => console.log(err))
      );
  };

  removeRoutine = (id) => {
    axios
      .delete("/routines/" + id, { headers: getHeaders() })
      .then(() => {
        this.setState({
          routines: this.state.routines.filter((routine) => routine.id !== id),
        });
      })
      .catch((err) => console.log(err));
  };

  showEditRoutine = (can_show) => {
    this.setState({ canShowEditRoutine: can_show});
  };
  shouldShowEditRoutine = (can_show) => {
    if (this.state.canShowEditRoutine) {
      return <EditRoutine></EditRoutine>;
    }
  };

  removeRoutineActivity = (id) => {
    axios
      .delete(`/routine_activities/${this.state.selected_routine_id}` + id, {
        headers: getHeaders(),
      })
      .then(() => {
        this.setState({
          routineActivities: this.state.routineActivities.filter(
            (activity) => activity.id !== id
          ),
        });
      })
      .catch((err) => console.log(err));
  };

  setRoutineActivities = (activities, selected_routine_id) => {
    this.setState({ routineActivities: activities, selected_routine_id });
  };

  printRoutinesAsRows = (routines = [], counter) => {
    let start_index = counter * 10;
    let possible_end_index = start_index + 10;
    let end_index =
      possible_end_index > routines.length
        ? routines.length
        : possible_end_index;
    let routines_to_show = routines.slice(start_index, end_index);
    return routines_to_show.map((routine, index) => {
      return (
        <tr>
          <td>{start_index + index + 1}</td>
          <td>{routine.name}</td>
          <td>{routine.goal}</td>
          <td>
            <button
              className="btn btn-primary"
              onClick={() =>
                this.setRoutineActivities(routine.activities, routine.id)
              }
            >
              {routine.activities.length}
            </button>
          </td>
          <td>{routine.creatorName}</td>
          <td>
            <button
              onClick={() => this.removeRoutine(routine.id)}
              className="btn btn-primary btn-sm"
            >
              Delete
            </button>{" "}
          </td>
          <td>
            <button
              onClick={() =>
                this.handleEditRoutine(routine.id)
              }
              className="btn btn-primary btn-sm"
            >
              Update
            </button>{" "}
          </td>
        </tr>
      );
    });
  };

  printActivitiesAsRows = () => {
    return this.state.routineActivities.map((activity, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{activity.name}</td>
          <td>{activity.description}</td>
          <td>{activity.duration}</td>
          <td>
            <button className="btn btn-primary btn-sm">Edit</button>
          </td>
          <td>
            <button
              onClick={() => this.removeRoutineActivity(activity.id)}
              className="btn btn-primary btn-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  goToRoutineChunk = (navigation) => {
    switch (navigation) {
      case "first_chunk":
        this.setState({ counter: 0 });
        break;
      case "last_chunk":
        let last_chunck_index = Math.floor(this.state.routines.length / 10);
        this.setState({ counter: last_chunck_index });
        break;

      case "next_chunk":
        this.setState({
          counter: this.state.counter + 1,
        });
        break;
      case "prev_chunk":
        this.setState({
          counter: this.state.counter - 1,
        });
        break;
      default:
        break;
    }
  };

  addtoRoutine = async (activity_id, count, duration) => {
    let url = `routines/${this.state.selected_routine_id}/activities`;
    let username = localStorage.getItem("username");
    axios.post(
      url,
      {
        activityId: activity_id,
        count: this.state.count,
        duration: this.state.duration,
      },
      {
        headers: getHeaders(),
      }
    ).then((response) => this.setState(prevState => {
        return{
        ...prevState,
        routineActivities: prevState.routineActivities.concat([response.data]),
        routines: prevState.routines.map(routine => {
            if (routine.id === prevState.selected_routine_id) {
                return {
                    ...routine,
                    activities: routine.activities.concat([response.data])
                };
            }
            return routine
        })
    }}))

    // //get all the routines
    // await axios
    //   .get(`users/${username}/routines`, { headers: getHeaders() })
    //   .then((res) => {
    //     //filter for the selected routine
    //     let [routine] = res.data.filter(
    //       (routine) => (routine.id = this.state.selected_routine_id)
    //     );

    //     // update routineActivites state
    //     this.setState({ routineActivities: routine.activities });
    //   });
  };

  setCount = (new_count) => {
    this.setState({ count: new_count });
  };

  setDuration = (new_duration) => {
    this.setState({ duration: new_duration });
  };
  render() {
    if (this.state.routineActivities) {
      return (
        <div>
          <div>
            <h1>Personal Routine Activities</h1>
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
                {this.printActivitiesAsRows(this.state.routineActivities)}
              </tbody>
            </table>
            <button
              className="btn btn-outline-success btn-sm"
              onClick={this.clearRoutineActivities}
            >
              Go Back
            </button>
          </div>

          <div className="activities_list">
            <Activities
              addtoRoutine={this.addtoRoutine}
              setCount={this.setCount}
              setDuration={this.setDuration}
              selected_routine_id={this.selected_routine_id}
            ></Activities>
            <h2>Count / Duration</h2>
          </div>
        </div>
      );
    }

    if (this.state.editingRoutine) {
        return (
            <EditRoutine routine={this.state.selectedRoutine} clearEditRoutine= {this.clearEditRoutine}></EditRoutine>
        )
    }
    return (
      <div className="routines_section">
        <h2 className="list-title">
          My Routines: {this.state.routines.length}
        </h2>

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
            <button
              className="btn btn-outline-success btn-sm"
              onClick={() => this.goToRoutineChunk("first_chunk")}
            >
              First
            </button>
            <button
              className="btn btn-outline-success btn-sm"
              disabled={this.state.counter <= 0}
              onClick={() => this.goToRoutineChunk("prev_chunk")}
            >
              Prev
            </button>
            <button
              className="btn btn-outline-success btn-sm"
              disabled={
                this.state.counter >=
                Math.floor(this.state.routines.length / 10)
              }
              onClick={() => this.goToRoutineChunk("next_chunk")}
            >
              Next
            </button>
            <button
              className="btn btn-outline-success btn-sm"
              onClick={() => this.goToRoutineChunk("last_chunk")}
            >
              Last
            </button>
            <button
              className="btn btn-outline-success btn-sm"
              onClick={() => this.clearRoutineActivities()}
            >
              Clear
            </button>
          </tfoot>
        </table>
      </div>
    );
  }
}
