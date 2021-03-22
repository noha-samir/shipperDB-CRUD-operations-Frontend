import React, { useState } from 'react';
import { Alert, Confirm } from 'react-st-modal';
import { CustomDialog, useDialog } from 'react-st-modal';

import ReactDOM from 'react-dom';
import FadeIn from 'react-fade-in';
import User from './user.js';

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function CustomDialogContent(jsonResult) {
    const dialog = useDialog();

    const [nameVal, setInput1] = useState(jsonResult.oldChallengeInfo.name); // '' is the initial state value
    const [descriptionVal, setInput2] = useState(jsonResult.oldChallengeInfo.description); // '' is the initial state value
    const [visibilityTypeVal, setInput3] = useState(jsonResult.oldChallengeInfo.visibilityType); // '' is the initial state value
    const [tagsVal, setInput4] = useState(jsonResult.oldChallengeInfo.tags); // '' is the initial state value
    const [locationVal, setInput5] = useState(jsonResult.oldChallengeInfo.location); // '' is the initial state value
    const [startDateVal, setInput6] = useState(formatDate(jsonResult.oldChallengeInfo.startDate)); // '' is the initial state value
    const [endDateVal, setInput7] = useState(formatDate(jsonResult.oldChallengeInfo.endDate)); // '' is the initial state value
    const [isActiveVal, setInput8] = useState(jsonResult.oldChallengeInfo.isActive); // '' is the initial state value
    const [imageVal, setInput9] = useState(jsonResult.oldChallengeInfo.image); // '' is the initial state value

    return (
        <div>
            <div className="updated-content">
                
                <label><b>  Name: </b></label>
                <input className="editInput"
                    placeholder="Enter challenge name..."
                    value={nameVal}
                    onInput={e => setInput1(e.target.value)}
                    type="text"
                />
                <br></br>

                <label><b>  Description: </b></label>
                <input className="editInput"
                    placeholder="Enter challenge description..."
                    value={descriptionVal}
                    onInput={e => setInput2(e.target.value)}
                    type="text"
                />
                <br></br>

                <label><b>  VisibilityType: </b></label>
                <input className="editInput"
                    placeholder="Enter challenge visibilityType..."
                    value={visibilityTypeVal}
                    onInput={e => setInput3(e.target.value)}
                    type="number" min="0"
                />
                <br></br>

                <label><b>  Tags: </b></label>
                <input className="editInput"
                    placeholder="Enter challenge tags..."
                    value={tagsVal}
                    onInput={e => setInput4(e.target.value)}
                    type="text"
                />
                <br></br>

                <label><b>  Location: </b></label>
                <input className="editInput"
                    placeholder="Enter challenge location..."
                    value={locationVal}
                    onInput={e => setInput5(e.target.value)}
                    type="text"
                />
                <br></br>

                <label><b>  StartDate: </b></label>
                <input className="editInput"
                    placeholder="Enter challenge startDate..."
                    value={startDateVal}
                    onInput={e => setInput6(e.target.value)}
                    type="date"
                />
                <br></br>

                <label><b>  EndDate: </b></label>
                <input className="editInput"
                    placeholder="Enter challenge endDate..."
                    value={endDateVal}
                    onInput={e => setInput7(e.target.value)}
                    type="date"
                />
                <br></br>

                <label><b>  Active Challenge: </b></label>
                <input
                    onInput={e => setInput8(e.target.value)}
                    type="checkbox"
                    id="checkBox"
                    value={isActiveVal}
                    defaultChecked={isActiveVal}
                >
                </input>

            </div>
            <div>
                <button className="row-btn ok-btn update-btn-challnge"
                    onClick={() => {
                        // Сlose the dialog and return the value
                        const requestOptions = {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json', 'x-access-token': jsonResult.token },
                            body: JSON.stringify({
                                "id": jsonResult.oldChallengeInfo.id,
                                "name": nameVal,
                                "visibilityType": visibilityTypeVal,
                                "description": descriptionVal,
                                "tags": tagsVal,
                                "location": locationVal,
                                "startDate": new Date(startDateVal),
                                "endDate": new Date(endDateVal),
                                "isActive": document.getElementById("checkBox").checked,
                                "userId": jsonResult.oldChallengeInfo.userId
                            })
                        };
                        fetch('http://127.0.0.1:5000/api/v1/challenge', requestOptions)
                            .then((result) => {
                                // Get the result
                                if (result.ok) {
                                    return result.json();
                                } else {
                                    throw result;
                                }
                            }).then((jsonResult) => {
                                dialog.close();
                                Alert('Done, You just updateed this Challenge :)', 'New Challenge Updated');
                            }).catch(function (error) {
                                error.json().then(function (object) {
                                    Alert(object['user-message'], 'Error');
                                });
                            });
                    }}>
                    Save
            </button>
            </div>
        </div>
    );
}

function CustomDialogInsertionContent(paramsVal) {
    const dialog = useDialog();

    const [nameVal, setInput1] = useState(''); // '' is the initial state value
    const [descriptionVal, setInput2] = useState(''); // '' is the initial state value
    const [visibilityTypeVal, setInput3] = useState(''); // '' is the initial state value
    const [tagsVal, setInput4] = useState(''); // '' is the initial state value
    const [locationVal, setInput5] = useState(''); // '' is the initial state value
    const [startDateVal, setInput6] = useState(''); // '' is the initial state value
    const [endDateVal, setInput7] = useState(''); // '' is the initial state value
    const [isActiveVal, setInput8] = useState(''); // '' is the initial state value
    const [imageVal, setInput9] = useState(''); // '' is the initial state value

    return (
        <div>

            <div className="updated-content">
                <label><b>  Pick a user for this challenge: </b></label>
                <select id="example-select">
                </select>

                <button className="fill-btn" id = "fill-btn"
                onClick={() => {
                    var select = document.getElementById("example-select");
                    select.options.length = 0;
                    for (let index in paramsVal.listOfUsers) {
                        select.options[select.options.length] = new Option(paramsVal.listOfUsers[index].email, index);
                    }
                    document.getElementById("fill-btn").style.display= 'none';
                }}>
                    Fill dropdown list
                </button>

                <br></br>
                <label><b>  Name: </b></label>
                <input className="editInput"
                    placeholder="Enter new challenge name..."
                    value={nameVal}
                    onInput={e => setInput1(e.target.value)}
                    type="text"
                />
                <br></br>

                <label><b>  Description: </b></label>
                <input className="editInput"
                    placeholder="Enter new challenge description..."
                    value={descriptionVal}
                    onInput={e => setInput2(e.target.value)}
                    type="text"
                />
                <br></br>

                <label><b>  VisibilityType: </b></label>
                <input className="editInput"
                    placeholder="Enter new challenge visibilityType..."
                    value={visibilityTypeVal}
                    onInput={e => setInput3(e.target.value)}
                    type="number" min="0"
                />
                <br></br>

                <label><b>  Tags: </b></label>
                <input className="editInput"
                    placeholder="Enter new challenge tags..."
                    value={tagsVal}
                    onInput={e => setInput4(e.target.value)}
                    type="text"
                />
                <br></br>

                <label><b>  Location: </b></label>
                <input className="editInput"
                    placeholder="Enter new challenge location..."
                    value={locationVal}
                    onInput={e => setInput5(e.target.value)}
                    type="text"
                />
                <br></br>

                <label><b>  StartDate: </b></label>
                <input className="editInput"
                    placeholder="Enter new challenge startDate..."
                    value={startDateVal}
                    onInput={e => setInput6(e.target.value)}
                    type="date"
                />
                <br></br>

                <label><b>  EndDate: </b></label>
                <input className="editInput"
                    placeholder="Enter new challenge endDate..."
                    value={endDateVal}
                    onInput={e => setInput7(e.target.value)}
                    type="date"
                />
                <br></br>

                <label><b>  Active Challenge: </b></label>
                <input
                    onInput={e => setInput8(e.target.value)}
                    type="checkbox"
                    id="checkBox"
                    value={isActiveVal}
                    defaultChecked={isActiveVal}
                >
                </input>

            </div>
            <div>
                <button className="row-btn ok-btn update-btn-challnge"
                    onClick={() => {
                        var select = document.getElementById("example-select");
                        // Сlose the dialog and return the value
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'x-access-token': paramsVal.token },
                            body: JSON.stringify({
                                "name": nameVal,
                                "visibilityType": visibilityTypeVal,
                                "description": descriptionVal,
                                "tags": tagsVal,
                                "location": locationVal,
                                "startDate": new Date(startDateVal),
                                "endDate": new Date(endDateVal),
                                "isActive": document.getElementById("checkBox").checked,
                                "userId":paramsVal.listOfUsers[select.options[select.selectedIndex].value].id
                            })
                        };
                        fetch('http://127.0.0.1:5000/api/v1/challenge', requestOptions)
                            .then((result) => {
                                // Get the result
                                if (result.ok) {
                                    return result.json();
                                } else {
                                    throw result;
                                }
                            }).then((jsonResult) => {
                                dialog.close();
                                Alert('Done, You just added this Challenge :)', 'New Challenge Addition');
                            }).catch(function (error) {
                                error.json().then(function (object) {
                                    Alert(object['user-message'], 'Error');
                                });
                            });
                    }}>
                    Save
        </button>
            </div>
        </div>
    );
}

class Challenge extends React.Component {

    listchallenges(token, callBack) {
        document.getElementById('output-challenge-table').style.display = "table";
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'x-access-token': token }
        };
        fetch('http://127.0.0.1:5000/api/v1/challenge/all', requestOptions)
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

    callDeleteChallengeApi(ChallengeId, token, callBack) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'x-access-token': token }
        };
        fetch('http://127.0.0.1:5000/api/v1/challenge/' + ChallengeId, requestOptions)
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

    callGetChallengeApi(ChallengeId, token) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'x-access-token': token }
        };
        fetch('http://127.0.0.1:5000/api/v1/Challenge/' + ChallengeId, requestOptions)
            .then((result) => {
                // Get the result
                if (result.ok) {
                    return result.json();
                } else {
                    throw result;
                }
            }).then((jsonResult) => {
                let info = "Name: " + jsonResult.name + "." + "\n" +
                    "Description: " + jsonResult.description + "." + "\n" +
                    "VisibilityType: " + jsonResult.visibilityType + "." + "\n" +
                    "tags: " + jsonResult.tags + "." + "\n" +
                    "Location: " + jsonResult.location + "." + "\n" +
                    "StartDate: " + jsonResult.startDate + "." + "\n" +
                    "EndDate: " + jsonResult.endDate + "." + "\n" +
                    "Is Active: " + jsonResult.isActive + "." + "\n";

                let newText = info.split('\n').map(str => <p>{str}</p>);
                Alert(newText, 'Challenge Information');
            }).catch(function (error) {
                error.json().then(function (object) {
                    Alert(object['user-message'], 'Error');
                });
            });
    }

    async callInsertChallengeApi(signedInUserToken, listOfUsers, callBack) {
        await CustomDialog(<CustomDialogInsertionContent listOfUsers={listOfUsers} token={signedInUserToken} />, {
            title: 'Challenge Addition',
            showCloseIcon: true,
        });
        callBack();
    }

    async callUpdateChallengeApi(oldChallengeInfo, signedInUserToken, callBack) {
        await CustomDialog(<CustomDialogContent oldChallengeInfo={oldChallengeInfo} token={signedInUserToken} />, {
            title: 'Challenge Modification',
            showCloseIcon: true,
        });
        callBack();
    }

    render() {
        return null;
    }
}

export default Challenge