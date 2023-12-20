// REQUIRE

const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const fs = require('fs');

// VALUES
const APP = express()
const PORT = process.env.PORT || 80;

APP.use(express.static('public'));
APP.use(bodyParser.urlencoded({ extended: true }));

let USER = null

// FUNCTIONS
function setLog(type, link) {
   console.log(`${type}\t${link}`)
}

// get
APP.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '/pages/index.html'));
   setLog("GET", "/")
})

APP.get('/login', (req, res) => {
   res.sendFile(path.join(__dirname, '/pages/login.html'));
   setLog("GET", "/login")
})

APP.get('/admin', (req, res) => {
   if (USER && USER.type === "admin") {
      res.sendFile(path.join(__dirname, '/pages/admin.html'));
   } else {
      res.sendFile(path.join(__dirname, '/pages/login.html'));
   }
   setLog("GET", "/admin")
})

APP.get('/profile', (req, res) => {
   if (USER) {
      res.sendFile(path.join(__dirname, '/pages/profile.html'));
   } else {
      res.sendFile(path.join(__dirname, '/pages/login.html'));
   }
   setLog("GET", "/profile")
})

//  post
APP.post('/login', (req, res) => {
   const { inLoginEmail, inLoginPassword } = req.body;

   fs.readFile(path.join(__dirname, '/database/users.json'), 'utf-8', (err, data) => {
      let dbUsers = JSON.parse(data)
      const user = dbUsers.find(el => el.email === inLoginEmail && el.password === inLoginPassword)
      if (user) {
         USER = user
         const dataUser = JSON.stringify(user)
         res.cookie('user', encodeURIComponent(dataUser), { maxAge: 24 * 60 * 60 * 1000, path: '/' })
         res.status(200).send(dataUser)
      } else {
         res.status(401).send("Incorrect data for authorization.");
      }
   })

   setLog("POST", "/login")
})

// start
APP.listen(PORT, () => {
   console.log("Server LIVE!")
   console.log(`http://localhost:${PORT}`)
   console.log(`\nREQUESTS:\n`)
})