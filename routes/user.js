// Contains all user related routes
const express = require('express')
const mysql = require('mysql')
const router = express.Router()

router.get('/messages', (req, res) => {
  console.log("Show some messages...")
  res.end()
})

router.get("/users", (req, res) => {
    console.log("Fetching all users...")
      
    const connection = getConnection()
    const queryString = "SELECT * FROM users"
  
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for users: " + err)
            res.sendStatus(500)
            return
        }
        console.log("I think we fetched users successfully")
        res.json(rows)
    })
})

function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        port: 8889,
        user: 'root',
        password: 'root',
        database: 'nodejs_restapi_db'
    })
}

router.post('/user_create', (req, res) => {
    console.log("Trying to create a new user...")
  
    const firstName = req.body.first_name
    const lastName = req.body.last_name
  
    console.log("First name: " + firstName)
    console.log("Last name: " + lastName)
  
    const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)"
    getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {
        if (err) {
            console.log("Failed to insert new user: " + err)
            res.sendStatus(500)
            return
        }
    
        console.log("Inserted a new user with id: " + results.insertId)
        res.end()
    })
  
    // res.end()
})

router.get("/user/:id", (req, res) => {
    console.log("Fetching user with id: " + req.params.id)
  
    const connection = getConnection()
  
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

// Exports router outside of this file
module.exports = router