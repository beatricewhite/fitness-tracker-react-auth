import React, {Component} from 'react'
import {Link} from 'react-router-dom'
export default class Nav extends Component{

    handleLogout = () => {
        localStorage.clear();
        this.props.setUser(null);
    }

    showLoggedInTabs =(user)=>{
        if (user) {
            return <>
            <li className="nav-item">
                <Link className="nav-link" to={'/'} onClick={this.handleLogout}>Logout</Link>
            </li>
                <li className="nav-item">
                <Link className="nav-link" to={'/Personal'}>My Routines</Link>
            </li>
            </>
        }
    }

    showLoggedOutTabs =  user => {
        if (!user) {
            return <>
                <li className="nav-item">
                    <Link className="nav-link" to={'/login'}>Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={'/register'}>Sign Up</Link>
                </li>
                
            </>
        }
    }
    render() {

        return (
            <nav className="navbar navbar-expand navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={'/'}>Home</Link>
                    <div className="collapse navbar-collapse">
                        
                        <ul className="navbar-nav ml-auto">
                            {this.showLoggedInTabs(this.props.user)}
                            {this.showLoggedOutTabs(this.props.user)}

                            <li className="nav-item">
                                <Link className="nav-link" to={'/Routines'}>Routines</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/Activities'}>Activities</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}