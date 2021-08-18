
import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Nav from './components/Nav';
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios';
import Routines from './components/Routines';
import Activities from './components/Activities';
import Personal from './components/Personal'
import { getHeaders } from './index'

export default class App extends Component {

  state = { 
    routines: [],
    selectedRoutine: ""
  }

  componentDidMount() {
    this.fetchUser();
  
   
  };

  fetchUser = async () => {
    await axios.get('/users/me', { headers: getHeaders() }).then(
      res => {
        console.log(res);
        this.setUser(res.data);
      },
      err => {
        console.log(err)
      }
    )
  }  

  setUser = user => {
    this.setState({
      user: user
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav user={this.state.user} setUser={this.setUser} />

          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route exact path="/" component={() => <Home user={this.state.user} />} />
                <Route exact path="/login" component={() => <Login setUser={this.setUser} />} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/routines" component={() => <Routines routines={this.state.routines}></Routines>} />
                <Route exact path="/activities" component={() => <Activities></Activities>}/>
                <Route exact path="/Personal" component={() => <Personal></Personal>}/>
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}



// export default App;
