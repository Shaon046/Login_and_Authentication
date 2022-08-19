const express = require("express");
const bcrypt = require("bcrypt");
const Router = express.Router();
const homeSchema = require("../models/homeSchema");

Router.get("/", (err, res) => {
  res.render("register", { title: "", password: "", email: "", logFailed: "" });
});

//done

Router.post("/register", async (req, res) => {
  try {
    const { name, email, password, cpassword } = req.body;

    if (password === cpassword) {
      const userData = new homeSchema({
        name,
        email,
        password,
      });

      userData.save(async (err) => {
        //////call pre fn at homeSchema before save ;
        if (err) {
          const usereEmail = await homeSchema.findOne({ email: email });
          if (email === usereEmail.email) {
            res.render("register", {
              title: "",
              password: "",
              email: "Email already exist",
              logFailed: "",
            });
          }
        } else {
          res.render("register", {
            title: "successful registration",
            password: "",
            email: "",
            logFailed: "",
          });
        }
      });

      //nested if-else
    } else {
      res.render("register", {
        title: "",
        password: "confirm password not match",
        email: "",
        logFailed: "",
      });
    }
  } catch (error) {
    res.render("register", {
      title: "Error in code",
      password: "",
      email: "",
      logFailed: "",
    });
  }
});

//log in

// Router.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   // const passwordHash=await bcrypt.hash(password,10)

//   try {
//     homeSchema.findOne({ email: email }, (err, result) => {
//       if (result == null) {
//         res.render("errorPage");
//       }
//       if (err) throw err;
//       if (result) {
//         if (email === result.email) {
//           const uName=result.name
//           bcrypt
//             .compare(password, result.password)
//             .then (async(result) => {
//               if (result == true) {
              
//                 res.render("dashboard", { name:uName })
//                 res.render("register", {
//                   title: "",
//                   password: "",
//                   email: "",
//                   logFailed: "Wrong password",
//                 });
//               }
//             })

//             .catch((err) => console.log("Error in login"));
//         }
//       }
//     });
//   } catch (error) {
//     {
//       res.render("register", {
//         title: "",
//         password: "",
//         email: "",
//         logFailed: "Wrong email or password",
//       });
//     }
//   }
// });

module.exports = Router;
