import React, {Component} from "react";
import {Link} from "react-router-dom";

const navBarStyle = {
	float: "left"
};

class NavBar extends Component {
	render() {
		return (
		
		<div style={navBarStyle}>
			<h3>NavBar</h3>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/userProfile">User Profile</Link></li>
				<li><Link to="/login">Login</Link></li>
				<li><Link to="/credits">Credits</Link></li>
				<li><Link to="/debits">Debits</Link>	</li>
			</ul>
		</div>
		);
		
	}

}

export default NavBar