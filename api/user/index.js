const express = require("express")
const userRouter = express.Router()

let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Brown" },
  { id: 3, name: "Chris" },
  { id: 4, name: "Danny" },
]

// ! 유저 목록을 조회하는 API
userRouter.get("/", (req, res) => {
  req.query.limit = req.query.limit || 10
  const limit = parseInt(req.query.limit, 10)
  if (Number.isNaN(limit)) {
    res.status(400).send("Bad Request")
  } else {
    res.json(users.slice(0, limit))
  }
})

// ! 유저를 조회하는 API
userRouter.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (Number.isNaN(id)) {
    return res.status(400).end()
  } else {
    const currentUser = users.find((user) => user.id === id)
    if (!currentUser) {
      return res.status(404).end()
    }
    res.json(currentUser)
  }
})

// ! 유저를 delete하는 API
userRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (Number.isNaN(id)) {
    return res.status(400).end()
  }
  users = users.filter((user) => user.id !== id)
  res.status(204).end()
})

// ! 유저를 추가하는 API
userRouter.post("/", (req, res) => {
  const name = req.body.name
  if (!name) {
    return res.status(400).end()
  }

  const foundUser = users.find((user) => user.name === name)
  if (foundUser) {
    return res.status(409).end()
  }

  const id = Date.now()
  const newUser = { id, name }
  users.push(newUser)
  res.status(201).json(newUser)
})

module.exports = userRouter
