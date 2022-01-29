// load our app server using express somehow...
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

// app.use(morgan('short'))
app.use(morgan('combined'))

// app.get("/user/:id", (req, res) => {
//   console.log("Fetching user with id: " + req.params.id)
//   res.end()
// })

app.get("/user/:id", (req, res) => {
  console.log("Fetching user with id: " + req.params.id)

  const connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'nodejs_restapi_db'
  })

  const userId = req.params.id
  const queryString = "SELECT * FROM users WHERE id = ?"
  connection.query(queryString, [userId], (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err)
      // throw err
      // or:
      // res.end()
      // return
      // or:
      res.sendStatus(500)
      return
    }
    console.log("I think we fetched users successfully")

    const users = rows.map((row) => {
      return {
        firstName: row.first_name,
        lastName: row.last_name
      }
    })

    // res.json(rows)
    res.json(users)
  })

  // const queryString = "SELECT * FROM users"
  // connection.query(queryString, (err, rows, fields) => {
  //   console.log("I think we fetched users successfully")
  //   res.json(rows)
  // })

  // res.end()
})

app.get("/", (req, res) => {
  console.log("Responding to root route...")
  res.send("Hellooo from ROOT")
})

app.get("/users", (req, res) => {
  // res.send("Nodemon auto updates when I save this file")
  const user1 = { firstName: "Pavel", lastName: "Palancica" }
  const user2 = { firstName: "Ahmad", lastName: "Tabibi" }
  const user3 = { firstName: "Omar", lastName: "Qaddoumi" }
  res.json([user1, user2, user3])
})

// localhost:3000
app.listen(3000, () => {
  console.log("Server is up and listening on 3000...")
})
