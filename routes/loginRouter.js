const express = require("express");
const Router = express.Router();
const homeSchema = require("../models/homeSchema");
const bcrypt=require('bcrypt')


Router.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    // const passwordHash=await bcrypt.hash(password,10)
  
    try {
      homeSchema.findOne({ email: email }, (err, result) => {
        if (result == null) {
          res.render("errorPage");
        }
        if (err) throw err;
        if (result) {
          if (email === result.email) {
            const uName=result.name
            bcrypt
              .compare(password, result.password)
              .then (async(result) => {
                if (result == true) {
                
                  res.render( "dashboard", { name:uName }) 
                }else{ res.render("register", {
                  title: "",
                  password: "",
                  email: "",
                  logFailed: "Wrong password",
                });}

              
              })
  
              .catch((err) => console.log("Error in login"));
          }
        }
      });
    } catch (error) {
      {
        res.render("register", {
          title: "",
          password: "",
          email: "",
          logFailed: "Wrong email or password",
        });
      }
    }
  });
  
  module.exports = Router;
  