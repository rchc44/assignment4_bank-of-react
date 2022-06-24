// src/App.js

import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from "./components/Credits";
import Debits from "./components/Debits";
import NavBar from "./components/NavBar";

import axios from "axios";

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      },
	  credits: [],
	  debits: [],
    }
  }
  async componentDidMount() {
	let creditsUrl = "https://moj-api.herokuapp.com/credits";
	let debitsUrl = "https://moj-api.herokuapp.com/debits";
	
	try {
		let creditsData = await axios.get(creditsUrl);
		let debitsData = await axios.get(debitsUrl);
		
		this.setState({credits:creditsData.data,debits:debitsData.data}, ()=>{this.calculateAccountBalance();});
		
	}
	catch(e) {
		if (e.response) {
			console.log(e.response.data);
			console.log(e.response.status);
		}
		
	}
  }

  calculateAccountBalance = () => {
	let totalCredits=0;
	let totalDebits=0;
	if (this.state.credits.length>0) {
		for (let i=0; i<this.state.credits.length; i++) {
			totalCredits+=this.state.credits[i].amount;
		}
		
	}
	if (this.state.debits.length>0) {
		for (let i=0; i<this.state.debits.length; i++) {
			totalDebits+=this.state.debits[i].amount;
		}		
	}
		
	let accountBalance = totalCredits-totalDebits;
	accountBalance = accountBalance.toFixed(2);
	this.setState({accountBalance: accountBalance});
	
	console.log("recalc curr balance",accountBalance);
  }

  
  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }
  
  
  getCleanedCurrDate = () => {
	let currDate = new Date(Date.now());
	currDate = currDate.toLocaleString().split(',')[0].split("/"); // converting data into expected format for Debits component
	currDate = `${currDate[2]}-${currDate[0]}-${currDate[1]}`;
	
	return currDate;
  }
  
  addCredit = (e) => {
	e.preventDefault();
	let data = {};
	
	let currDateId = new Date(Date.now());
	data["id"] = `${currDateId}`; // react requires unique id for each element in rendered list, so date string is being used as id 
	data["description"] = e.target.description.value;
	data["amount"] = Number(e.target.amount.value);  // initial given amount from the form is a string datatype
	data["date"] = this.getCleanedCurrDate();
	
	
	// clear form data 
	e.target.description.value = "";
	e.target.amount.value = "";
	
	
	this.setState({credits: [...this.state.credits, data]},()=>{this.calculateAccountBalance()});
  }
  addDebit = (e) => {
	e.preventDefault();
	let data = {};
	
	let currDateId = new Date(Date.now());
	data["id"] = `${currDateId}`; // react requires unique id for each element in rendered list, so date string is being used as id 
	data["description"] = e.target.description.value;
	data["amount"] = Number(e.target.amount.value);  // initial given amount from the form is a string datatype
	data["date"] = this.getCleanedCurrDate();
	
	
	// clear form data 
	e.target.description.value = "";
	e.target.amount.value = "";
	
	
	this.setState({debits: [...this.state.debits, data]},()=>{this.calculateAccountBalance()});
  }
	
  // Create Routes and React elements to be rendered using React components
  render() {  
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)  // Pass props to "LogIn" component
	const CreditsComponent = () => (<Credits addCredit={this.addCredit} credits={this.state.credits} accountBalance={this.state.accountBalance}/>)
	const DebitsComponent = () => (<Debits addDebit={this.addDebit} debits={this.state.debits} accountBalance={this.state.accountBalance}/>)
    return (
      <Router basename={process.env.PUBLIC_URL}>
		<NavBar />
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
		  <Route exact path="/credits" render={CreditsComponent} />
		  <Route exact path="/debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;