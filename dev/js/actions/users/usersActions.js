import * as UsersActionsTypes from '../../constants/users/UsersActionsTypes';
import fetch from "isomorphic-fetch";
//var UserSchema = require('../../../../server-dev/models/UserSchema');
import UserSchema from '../../../../server-dev/models/UserSchema';
var mongoose = require('mongoose');

const targetUrl = "/getUsers";

var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json', );

export const submitUserForm = (state) => {
  fetch(targetUrl, {
    method: 'POST',
    mode : 'cors',
    cache : 'default',
    headers : myHeaders,
    body : JSON.stringify({
      ['details.name']    : state.name,
      ['details.phone']   : state.phone,
      ['details.address'] : state.address,
      ['details.email']   : state.email,
      ['details.country'] : state.country,
      company             : state.company
    })
  });
  return {
    type    : "SUBMIT_USERS_FORM"
  }
};

export const changePropValue = (event) => {
  var property     = event.target.id,
      propertValue = event.target.value;

  return {
    type          : "CHANGE_PROP_VALUE",
    property      : property,
    propertyValue : propertValue
  }
}

export const requestAllUsers = () => {
  $.ajax({
    url : targetUrl,
    method: 'GET',
    crossDomain: true,
    success: function (res) {
      console.log(res);
    }
  });

  return dispatch => {
    return fetch(targetUrl, {
      method: "get",
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => dispatch(receiveAllUsers(json)))
  }
}

export const receiveAllUsers = (allUsers) => {
  return {
    type: "SHOW_ALL_USERS",
    allUsers: allUsers
  }
}



