var UserModel = require("../models/UserModel.js");
var ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../config/keys");

/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {
  /**
   * UserController.list()
   */
  list: function(req, res) {
    UserModel.find(function(err, Users) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting User.",
          error: err
        });
      }
      return res.json(Users);
    });
  },

  /**
   * UserController.show()
   */
  show: function(req, res) {
    var id = req.params.id;
    console.log('/users', id);
    UserModel.findOne({ _id: id }, function(err, User) {
      if (err) {
        console.log("ERROR")
        return res.status(500).json({
          message: "Error when getting User.",
          error: err
        });
      }
      if (!User) {
        console.log("USER NOT FOUND")
        return res.status(404).json({
          message: "No such User"
        });
      }
      console.log("THE USER SENT BY CONTROLLER: ", User);
      return res.json(User);
    });
  },

  /**
   * UserController.create()
   */
  create: function(req, res) {
    var User = new UserModel({
      email: req.body.email,
      password: req.body.password,
      balance: req.body.balance
    });

    User.save(function(err, User) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating User",
          error: err
        });
      }
      return res.status(201).json(User);
    });
  },

  /**
   * UserController.update()
   */
  update: function(req, res) {
    var id = req.params.id;
    UserModel.findOne({ _id: id }, function(err, User) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting User",
          error: err
        });
      }
      if (!User) {
        return res.status(404).json({
          message: "No such User"
        });
      }

      console.log("NEW BALANCE: ", req.body.balance);

      User.email = req.body.email ? req.body.email : User.email;
      User.password = req.body.password ? req.body.password : User.password;
      User.balance = req.body.balance ? req.body.balance : User.balance;

      User.save(function(err, User) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating User.",
            error: err
          });
        }

        return res.json(User);
      });
    });
  },

  /**
   * UserController.remove()
   */
  remove: function(req, res) {
    var id = req.params.id;
    UserModel.findByIdAndRemove(id, function(err, User) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the User.",
          error: err
        });
      }
      return res.status(204).json();
    });
  },

  /**
   * UserController.register()
   */
  register: function(req, res) {
    // Form validation

    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    UserModel.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new UserModel({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          balance: 10000
        });

        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  },

  /**
   * UserController.login()
   */
  login: function(req, res) {
    // Form validation

    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    UserModel.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }

      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };

          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  }
};
