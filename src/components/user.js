import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Alert, Confirm } from 'react-st-modal';
import FadeIn from 'react-fade-in';
import { CustomDialog, useDialog } from 'react-st-modal';
import Challenge from './challenge.js';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './user.css';

let aChallenge = new Challenge();


function CustomDialogContent(jsonResult) {
    const dialog = useDialog();

    const [nameVal, setInput1] = useState(jsonResult.oldUserInfo.name); // '' is the initial state value
    const [emailVal, setInput2] = useState(jsonResult.oldUserInfo.email); // '' is the initial state value
    const [oldPasswordVal, setInput3] = useState(''); // '' is the initial state value
    const [newPasswordVal, setInput4] = useState(''); // '' is the initial state value

    return (
        <div>
            <div className="updated-content">
                <label><b>  Name: </b></label>
                <input className="editInput"
                    placeholder="Enter your new name..."
                    value={nameVal}
                    onInput={e => setInput1(e.target.value)}
                    type="text"
                />
                <br></br>
                <label><b>  Email: </b></label>
                <input className="editInput"
                    placeholder="Enter your new email..."
                    value={emailVal}
                    onInput={e => setInput2(e.target.value)}
                    type="email"
                />
                <br></br>
                <label><b>  Old Password: <b className="info">(8 characters minimum)</b></b></label>

                <input className="editInput"
                    placeholder="Enter your old password..."
                    value={oldPasswordVal}
                    onInput={e => setInput3(e.target.value)}
                    type="password"
                />
                <br></br>
                <label><b>  New Password: <b className="info">(8 characters minimum)</b></b></label>

                <input className="editInput"
                    placeholder="Enter your new password..."
                    value={newPasswordVal}
                    onInput={e => setInput4(e.target.value)}
                    type="password"
                />
            </div>
            <br></br>
            <div>
                <button className="row-btn ok-btn"
                    onClick={() => {
                        // Сlose the dialog and return the value
                        let newUserInfo = {
                            "id": jsonResult.oldUserInfo.id,
                            "name": nameVal,
                            "email": emailVal,
                            "oldPassword": oldPasswordVal,
                            "password": newPasswordVal,
                            "parentAccountId": jsonResult.oldUserInfo.parentAccountId,
                            "isActive": jsonResult.oldUserInfo.isActive
                        };
                        if (jsonResult.oldUserInfo.password == newUserInfo.oldPassword) {
                            const requestOptions = {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json', 'x-access-token': jsonResult.token },
                                body: JSON.stringify({
                                    "id": newUserInfo.id,
                                    "name": newUserInfo.name,
                                    "email": newUserInfo.email,
                                    "password": newUserInfo.password,
                                    "parentAccountId": newUserInfo.parentAccountId,
                                    "isActive": newUserInfo.isActive
                                })
                            };
                            fetch('http://127.0.0.1:5000/api/v1/user', requestOptions)
                                .then((result) => {
                                    // Get the result
                                    if (result.ok) {
                                        return result.json();
                                    } else {
                                        throw result;
                                    }
                                }).then((jsonResult) => {
                                    dialog.close();
                                    Alert('Done, You just updated this user :)', 'New User Information');
                                }).catch(function (error) {
                                    error.json().then(function (object) {
                                        Alert(object['user-message'], 'Error');
                                    });
                                });
                        } else {
                            Alert('Invalid old password!!!', 'Error');
                        }
                    }}>
                    Save
            </button>
            </div>
        </div>
    );
}

function CustomDialogInsertionContent(user) {
    const dialog = useDialog();

    const [nameVal, setInput1] = useState(""); // "" is the initial state value
    const [emailVal, setInput2] = useState(""); // "" is the initial state value
    const [passwordVal, setInput3] = useState(""); // "" is the initial state value
    const [confirmedPasswordVal, setInput4] = useState(''); // "" is the initial state value
    const [isActive, setInput5] = useState(""); // "" is the initial state value

    return (
        <div>
            <div className="updated-content">
                <label><b>  Name: </b></label>
                <input className="editInput"
                    placeholder="Enter name..."
                    value={nameVal}
                    onInput={e => setInput1(e.target.value)}
                    type="text"
                    required>
                </input>
                <br></br>
                <label><b>  Email: </b></label>
                <input className="editInput"
                    placeholder="Enter email..."
                    value={emailVal}
                    onInput={e => setInput2(e.target.value)}
                    type="email"
                    required>
                </input>
                <br></br>
                <label><b>  Password: <b className="info">(8 characters minimum)</b></b></label>

                <input className="editInput"
                    placeholder="Enter password..."
                    value={passwordVal}
                    onInput={e => setInput3(e.target.value)}
                    type="password"
                    required>
                </input>
                <br></br>
                <label><b>  Confirm Password: </b></label>
                <input className="editInput"
                    placeholder="Confirm password..."
                    value={confirmedPasswordVal}
                    onInput={e => setInput4(e.target.value)}
                    type="password"
                    required>
                </input>
                <br></br>
                <label><b>  Active User: </b></label>
                <input
                    onInput={e => setInput5(e.target.value)}
                    type="checkbox"
                    id="checkBox"
                    value={isActive}
                >
                </input>
            </div>
            <br></br>
            <div>
                <button className="row-btn ok-btn"
                    onClick={() => {
                        let activeUser = false;
                        // Сlose the dialog and return the value
                        if (document.getElementById("checkBox").checked) {
                            activeUser = true;
                        }
                        if (confirmedPasswordVal == passwordVal) {
                            const requestOptions = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json', 'x-access-token': user.token },
                                body: JSON.stringify({
                                    "name": nameVal,
                                    "email": emailVal,
                                    "password": confirmedPasswordVal,
                                    "parentAccountId": user.userId,
                                    "isActive": activeUser
                                })
                            };
                            fetch('http://127.0.0.1:5000/api/v1/user', requestOptions)
                                .then((result) => {
                                    // Get the result
                                    if (result.ok) {
                                        return result.json();
                                    } else {
                                        throw result;
                                    }
                                }).then((jsonResult) => {
                                    dialog.close();
                                    Alert('Done, You just added this user :)', 'New User Added');
                                }).catch(function (error) {
                                    error.json().then(function (object) {
                                        Alert(object['user-message'], 'Error');
                                    });
                                });
                        } else {
                            Alert('Unmatched passwords', 'Error');
                        }
                    }}>
                    Add User
            </button>
            </div>
        </div>
    );
}

function showDivAndHideAnotherOne(showDivId, hideDivId) {
    document.getElementById('output-user-table').style.display = "none";
    document.getElementById('output-challenge-table').style.display = "none";
    document.getElementById(hideDivId).style.display = "none";
    document.getElementById(showDivId).style.display = "block";
}

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users: [], challenges: [] };
        this.challengeState = [];
    }
    
    listUsersWithCallBack(token,callBack) {
        document.getElementById('output-user-table').style.display = "table";
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'x-access-token': token }
        };
        fetch('http://127.0.0.1:5000/api/v1/user/all', requestOptions)
            .then((result) => {
                // Get the result
                if (result.ok) {
                    return result.json();
                } else {
                    throw result;
                }
            }).then((jsonResult) => {
                // Do something with the result
                callBack(jsonResult);
            }).catch(function (error) {
                error.json().then(function (object) {
                    Alert(object['user-message'], 'Error');
                });
            });
    }

    listUsers() {
        document.getElementById('output-user-table').style.display = "table";
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'x-access-token': this.props.user.fcmToken }
        };
        fetch('http://127.0.0.1:5000/api/v1/user/all', requestOptions)
            .then((result) => {
                // Get the result
                if (result.ok) {
                    return result.json();
                } else {
                    throw result;
                }
            }).then((jsonResult) => {
                // Do something with the result
                this.setState({ users: jsonResult });
            }).catch(function (error) {
                error.json().then(function (object) {
                    Alert(object['user-message'], 'Error');
                });
            });
    }

    callDeleteUserApi(userId) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'x-access-token': this.props.user.fcmToken }
        };
        fetch('http://127.0.0.1:5000/api/v1/user/' + userId, requestOptions)
            .then((result) => {
                // Get the result
                if (result.ok) {
                    return result.json();
                } else {
                    throw result;
                }
            }).then((jsonResult) => {
                // Do something with the result
                this.listUsers();
                Alert('Done, You just delete user: ' + jsonResult.name, 'User deleted');
            }).catch(function (error) {
                error.json().then(function (object) {
                    Alert(object['user-message'], 'Error');
                });
            });
    }

    callGetUserApi(userId) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'x-access-token': this.props.user.fcmToken }
        };
        fetch('http://127.0.0.1:5000/api/v1/user/' + userId, requestOptions)
            .then((result) => {
                // Get the result
                if (result.ok) {
                    return result.json();
                } else {
                    throw result;
                }
            }).then((jsonResult) => {
                let info = "Name: " + jsonResult.name + "." + "\n" + "Email: " + jsonResult.email + "." + "\n" + "Is Active: " + jsonResult.isActive + "." + "\n";
                let newText = info.split('\n').map(str => <p>{str}</p>);
                Alert(newText, 'User Information');
            }).catch(function (error) {
                error.json().then(function (object) {
                    Alert(object['user-message'], 'Error');
                });
            });
    }

    async callInsertUserApi() {
        await CustomDialog(<CustomDialogInsertionContent userId={this.props.user.id} token={this.props.user.fcmToken} />, {
            title: 'User Addition',
            showCloseIcon: true,
        });
        this.listUsers();
    }

    async callUpdateUserApi(oldUserInfo) {
        await CustomDialog(<CustomDialogContent oldUserInfo={oldUserInfo} token={this.props.user.fcmToken} />, {
            title: 'User Modification',
            showCloseIcon: true,
        });
        this.listUsers();
    }

    render() {
        return (<div>
            <header className="App-header">
                <h3>Welcome To ShipperDB</h3>
            </header>
            <div className="container">
                <div className="side-bar">
                    <ProSidebar>
                        <Menu iconShape="square">
                            <MenuItem onClick={() => showDivAndHideAnotherOne("App-form-user-id", "App-form-challenge-id")}>Users</MenuItem>
                            <MenuItem onClick={() => showDivAndHideAnotherOne("App-form-challenge-id", "App-form-user-id")}>Challenges</MenuItem>
                        </Menu>
                    </ProSidebar>
                </div>
                <div id="App-form-user-id" className="App-form-user">
                    <button className="list-button" onClick={() => this.listUsers()}>
                        <span>List all users</span>
                    </button>
                    <button className="list-button" onClick={() => this.callInsertUserApi()}>
                        <span>Insert new user</span>
                    </button>
                </div>

                <div id="App-form-challenge-id" className="App-form-challenge">
                    <button className="list-button"
                        onClick={() => {
                            let self = this;
                            aChallenge.listchallenges(self.props.user.fcmToken, function (listOfChallenges) {
                                self.setState({ challenges: listOfChallenges });
                            });
                        }}
                    ><span>List all challenges</span>
                    </button>
                    <button className="list-button" 
                        onClick={() => {
                            let self = this;
                            self.setState({ users: [] });
                            self.listUsersWithCallBack(self.props.user.fcmToken,function(listOfUsers){
                                aChallenge.callInsertChallengeApi(self.props.user.fcmToken,listOfUsers, function () {
                                    aChallenge.listchallenges(self.props.user.fcmToken, function (listOfChallenges) {
                                        self.setState({ challenges: listOfChallenges });
                                    });
                                });
                            });    
                        }}>
                        <span>Insert new challenge</span>
                    </button>
                </div>

                <ul id="output-user-table" className='box'>
                    {this.state.users.map(user => {
                        return <FadeIn>
                            <li className='box-row' key={user.id}>
                                <div className='box-cell box1' onClick={() => this.callGetUserApi(user.id)}>
                                    Name: {user.name}<br></br>
                                    Email: {user.email}
                                </div>
                                <div className='box-cell box2'>
                                    <div>
                                        <button className='delete-btn row-btn'
                                            onClick={async () => {
                                                const result = await Confirm('Are you sure that you want to delete this user !!!',
                                                    'Сonfirmation Alert');
                                                if (result) {
                                                    // Сonfirmation confirmed
                                                    this.callDeleteUserApi(user.id);
                                                } else {
                                                    // Сonfirmation not confirmed
                                                }
                                            }}
                                        >
                                            <span>Delete User</span>
                                        </button>
                                    </div>
                                    <div>
                                        <button className='update-btn row-btn'
                                            onClick={() => this.callUpdateUserApi(user)}
                                        >
                                            <span>Update User</span>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        </FadeIn>
                    })}
                </ul>

                <ul id="output-challenge-table" className='box'>
                    {this.state.challenges.map(challenge => {
                        return <FadeIn>
                            <li className='box-row' key={challenge.id}>
                                <div className='box-cell box1' onClick={() => {
                                let self = this;
                                aChallenge.callGetChallengeApi(challenge.id,self.props.user.fcmToken, function () {
                                });
                            }}>
                                    Name: {challenge.name}<br></br>
                                    Description: {challenge.description}
                                </div>
                                <div className='box-cell box2'>
                                    <div>
                                        <button className='delete-btn row-btn'
                                            onClick={async () => {
                                                const result = await Confirm('Are you sure that you want to delete this challenge !!!',
                                                    'Сonfirmation Alert');
                                                if (result) {
                                                    // Сonfirmation confirmed
                                                    let self = this;
                                                    aChallenge.callDeleteChallengeApi(challenge.id,self.props.user.fcmToken, function (jsonResult) {
                                                        Alert('Done, You just delete Challenge: ' + jsonResult.name, 'Challenge deleted');
                                                        aChallenge.listchallenges(self.props.user.fcmToken, function (listOfChallenges) {
                                                            self.setState({ challenges: listOfChallenges });
                                                        });
                                                    });
                                                } else {
                                                    // Сonfirmation not confirmed
                                                }
                                            }}
                                        >
                                            <span>Delete Challenge</span>
                                        </button>
                                    </div>
                                    <div>
                                        <button className='update-btn row-btn'
                                        onClick={() => {
                                            let self = this;
                                            aChallenge.callUpdateChallengeApi(challenge, self.props.user.fcmToken, function () {
                                                aChallenge.listchallenges(self.props.user.fcmToken, function (listOfChallenges) {
                                                    self.setState({ challenges: listOfChallenges });
                                                });
                                            });
                                        }}
                                        >
                                            <span>Update Challenge</span>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        </FadeIn>
                    })}
                </ul>
            
            </div>
        </div>)
    }
}

export default User