
var restful = require('node-restful');
var mongoose = require('mongoose');
var UserSchema = require('../models/UserSchema');
var express = require('express');
var fs = require('fs');
var path = require('path');

var app = express();

module.exports = function (app, route) {

  var rest = restful.model(
    'getUsers',
    app.models.getUsers
  ).methods(['get', 'post']);

  rest.route('get', {
    details: true,
    handler: function (req, res, next) {
      var requestedEmail = req.query.email;
      var requestedId = req.query.id;
      var requestedIds = req.query.ids;

      fs.readFile(path.join(__dirname, '../../data.json'), function (err, data) {
        var arrayOfObjects = JSON.parse(data);
        console.log('arrayOfObjects: ', arrayOfObjects);
        res.send(arrayOfObjects);
      });


      // if (requestedEmail) {
      //   var UserModel = mongoose.model('User', UserSchema);
      //   console.log({'Search by EMAIL ongoing': requestedEmail});
      //   UserModel.find({'details.email': {$regex: ".*" + requestedEmail.toLowerCase() + ".*"}}, function (err, docs) {
      //     if (err) {
      //       res.send('ERROR WITH THE QUERY')
      //     }
      //     res.send(docs)
      //   });
      // } else if (requestedId) {
      //   console.log({'Search by ID ongoing': requestedId})
      //   var UserModel = mongoose.model('User', UserSchema);
      //   UserModel.find({'id': requestedId}, function (err, docs) {
      //     if (err) {
      //       res.send('ERROR WITH THE QUERY')
      //     }
      //     res.send(docs)
      //   });
      // }
      // else if (requestedIds) {
      //   console.log({'Search by IDS ongoing': requestedIds})
      //   var UserModel = mongoose.model('User', UserSchema);
      //   UserModel.find({'id': {$in: requestedIds.split(',')}}, function (err, docs) {
      //     if (err) {
      //       res.send('ERROR WITH THE QUERY')
      //     }
      //     res.send(docs)
      //   });
      // }
      // else {
      //   var UserModel = mongoose.model('User', UserSchema);
      //   console.log('Search for all users ongoing');
      //   UserModel.find(function (err, docs) {
      //     if (err) {
      //       res.send('ERROR WITH THE QUERY')
      //     }
      //     res.send(docs)
      //   });
      // }
    }
  });

  rest.route('post', {
    details:true,
    handler : function (req, res) {
      console.log('1');
      var reqBody = req.body;
      //console.log(reqBody);
      //console.log(UserModel);
      // if (err) {
      //   conosle.log('err', err);
      //   return console.error(err);
      // }
      var newUserId;
      console.log('reqBody: ', reqBody);
      //reqBody = JSON.parse(Object.keys(reqBody));

      console.log(path.join(__dirname, '../../data.json'));

      fs.readFile(path.join(__dirname, '../../data.json'), function(err, data) {
        if (err) throw err;

        var newUserId;

        var arrayOfObjects = JSON.parse(data);
        if(arrayOfObjects.users.length == 0 ) {
          newUserId = 1;
        } else {
          newUserId = arrayOfObjects.users[arrayOfObjects.users.length - 1].id + 1;
        }
        arrayOfObjects.users.push({
          id : newUserId,
          details : {
            name : reqBody['details.name'],
            email  : reqBody['details.email'],
            address: reqBody['details.address'],
            country: reqBody['details.country'],
            company: reqBody.company,
            phone  : reqBody['details.phone']
          }
        });

        console.log('arrayOfObjects: ', arrayOfObjects);
        fs.writeFile(path.join(__dirname, '../../data.json'), JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
          if (err) throw err
          console.log('Done!');
        });

      });


      // var users = UserModel.find(function (err, users) {
      //   if (err) {
      //     conosle.log('err', err);
      //     return console.error(err);
      //   }
      //   users.sort(function (a, b) {
      //     return b.id - a.id
      //   });
      //
      //   var newUserId;
      //   if (users.length == 0) {
      //     newUserId = 1;
      //   }
      //   else {
      //     newUserId = users[0].id + 1;
      //   }
      //   console.log('2');
      //   //console.log('reqBody.company: ', reqBody.company);
      //   //reqBody = JSON.parse(Object.keys(reqBody)[0]);
      //   var newUser = {
      //     id: newUserId,
      //     details: {
      //       name    : reqBody['details.name'],
      //       email   : reqBody['details.email'],
      //       address : reqBody['details.address'],
      //       country : reqBody['details.country'],
      //       company : reqBody.company,
      //       phone   : reqBody['details.phone']
      //     }
      //   };
      //   console.log('hey there', newUser);
      //
      //   newUser.save(function (err) {
      //     if (err) {
      //       //console.log('errror', err);
      //       res.send('Error occurred while saving the new collaboration: ' + err)
      //     }
      //     else {
      //       res.send(newUser)
      //     }
      //   });
      // });
    }
  });

  rest.register(app, route);

  return function (req, res, next) {
    next();
  };
};
