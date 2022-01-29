// load our app server using express somehow...
const express = require('express')
const app = express()
const morgan = require('morgan')

// app.use(morgan('short'))
app.use(morgan('combined'))

app.get("/", (req, res) => {
  console.log("Responding to root route...")
  const user1 = { firstName: "Pavel", lastName: "Palancica" }
  const user2 = { firstName: "Ahmad", lastName: "Tabibi" }
  const user3 = { firstName: "Omar", lastName: "Qaddoumi" }
  res.json([user1, user2, user3])
  // res.send("Hellooo from ROOT")
})

app.get("/users", (req, res) => {
  res.send("Nodemon auto updates when I save this file")
})

// localhost:3000
app.listen(3000, () => {
  console.log("Server is up and listening on 3000...")
})
