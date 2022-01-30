// load our app server using express somehow...
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')

// Middleware configuration
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('./public'))

// app.use(morgan('short'))
app.use(morgan('combined'))

// app.post('/user_create', (req, res) => {
//   console.log("Trying to create a new user...")

//   const firstName = req.body.first_name
//   const lastName = req.body.last_name

//   console.log("First name: " + firstName)
//   console.log("Last name: " + lastName)

//   const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)"
//   getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {
//     if (err) {
//       console.log("Failed to insert new user: " + err)
//       res.sendStatus(500)
//       return
//     }

//     console.log("Inserted a new user with id: " + results.insertId)
//     res.end()
//   })

//   // res.end()
// })

// function getConnection() {
//   return mysql.createConnection({
//     host: 'localhost',
//     port: 8889,
//     user: 'root',
//     password: 'root',
//     database: 'nodejs_restapi_db'
//   })
// }

// app.get("/user/:id", (req, res) => {
//   console.log("Fetching user with id: " + req.params.id)
//   res.end()
// })

// app.get("/user/:id", (req, res) => {
//   console.log("Fetching user with id: " + req.params.id)

//   const connection = getConnection()

//   const userId = req.params.id
//   const queryString = "SELECT * FROM users WHERE id = ?"
//   connection.query(queryString, [userId], (err, rows, fields) => {
//     if (err) {
//       console.log("Failed to query for users: " + err)
//       // throw err
//       // or:
//       // res.end()
//       // return
//       // or:
//       res.sendStatus(500)
//       return
//     }
//     console.log("I think we fetched users successfully")

//     const users = rows.map((row) => {
//       return {
//         firstName: row.first_name,
//         lastName: row.last_name
//       }
//     })

//     // res.json(rows)
//     res.json(users)
//   })

//   // const queryString = "SELECT * FROM users"
//   // connection.query(queryString, (err, rows, fields) => {
//   //   console.log("I think we fetched users successfully")
//   //   res.json(rows)
//   // })

//   // res.end()
// })

app.get("/", (req, res) => {
  console.log("Responding to root route...")
  res.send("Hellooo from ROOT")
})

// Refactoring code using Router
const router = require('./routes/user.js')

app.use(router)

// app.get("/users", (req, res) => {
//   // res.send("Nodemon auto updates when I save this file")
//   /*const user1 = { firstName: "Pavel", lastName: "Palancica" }
//   const user2 = { firstName: "Ahmad", lastName: "Tabibi" }
//   const user3 = { firstName: "Omar", lastName: "Qaddoumi" }
//   res.json([user1, user2, user3])*/

//   console.log("Fetching all users...")
    
//   const connection = getConnection()
//   const queryString = "SELECT * FROM users"

//   connection.query(queryString, (err, rows, fields) => {
//     if (err) {
//       console.log("Failed to query for users: " + err)
//       res.sendStatus(500)
//       return
//     }
//     console.log("I think we fetched users successfully")
//     res.json(rows)
//   })
// })

// localhost:3000
app.listen(3000, () => {
  console.log("Server is up and listening on 3000...")
})
