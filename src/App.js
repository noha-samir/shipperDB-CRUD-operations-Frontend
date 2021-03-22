import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import User from './components/user';
import './App.css';
import { Alert } from 'react-st-modal';
import Challenge from './components/challenge';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  callLoginApi(email, password) {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    };
    fetch('http://127.0.0.1:5000/api/v1/user/login', requestOptions)
      .then((result) => {
        // Get the result
        if (result.ok) {
          return result.json();
        } else {
          throw result;
        }
      }).then((jsonResult) => {
        this.state = jsonResult;
        // Do something with the result
        ReactDOM.render(
          <React.StrictMode>
            <User user={this.state} />
            <Challenge/>
          </React.StrictMode>,
          document.getElementById('root')
        );
      }).catch(function (error) {
        error.json().then(function (object) {
          Alert(object['user-message'], 'Error');
        });
      });
  }
  callSignUpApi(name,email, password) {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "name":name,
        "email": email,
        "password": password
      })
    };
    fetch('http://127.0.0.1:5000/api/v1/user/signup', requestOptions)
      .then((result) => {
        // Get the result
        if (result.ok) {
          return result.json();
        } else {
          throw result;
        }
      }).then((jsonResult) => {
        this.state = jsonResult;
        // Do something with the result
        ReactDOM.render(
          <React.StrictMode>
            <User user={this.state} />
          </React.StrictMode>,
          document.getElementById('root')
        );
      }).catch(function (error) {
        error.json().then(function (object) {
          Alert(object['user-message'], 'Error');
        });
      });
  }
  render() {
    return <div>
      <header className="App-header">
        <h3>Welcome To ShipperDB</h3>
      </header>

      <div id="wrapper">
        <div id="left">
          <img src="https://arabacademy-u8hapu3mdn.netdna-ssl.com/wp-content/uploads/2015/04/loginImage-400x300.jpg" className="App-logo" alt="login" />
          <br></br>
          <label><b>Email: </b></label>
          <br></br>
          <input type="email" placeholder="Enter Email" id="email" name="uname" required></input>
          <br></br>
          <br></br>
          <label><b>Password: </b></label>
          <br></br>
          <input type="password" placeholder="Enter Password" id="password" required></input>
          <br></br>
          <button className="button" onClick={() => this.callLoginApi(document.getElementById("email").value, document.getElementById("password").value)}>
          <span>Login</span>
      </button>
        </div>

        <div id="right">
          <img src="http://pomepos.com/wp-content/uploads/2015/01/LoginRed.jpg" className="App-logo" alt="signup" />
          <label><b>Name: </b></label>
          <br></br>
          <input type="text" placeholder="Enter Name" id="sname" name="sname" required></input>
          <br></br>
          <label><b>Email: </b></label>
          <br></br>
          <input type="email" placeholder="Enter Email" id="semail" name="semail" required></input>
          <br></br>
          <label><b>Password: <b className= "info">(8 characters minimum)</b></b></label>
          <br></br>
          <input type="password" minLength='8' placeholder="Enter Password" id="spassword" required></input>
          <br></br>
          <button className="button" onClick={() => this.callSignUpApi(document.getElementById("sname").value,document.getElementById("semail").value, document.getElementById("spassword").value)}>
          <span>Sign up</span>
      </button>
        </div>
      </div>
    </div>;
  }
}

export default App