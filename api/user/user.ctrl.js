// 라우트 핸들러 함수만 따로 모아놓은 파일
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Brown" },
  { id: 3, name: "Chris" },
  { id: 4, name: "Danny" },
]

const index = (req, res) => {
  req.query.limit = req.query.limit || 10
  const limit = parseInt(req.query.limit, 10)
  if (Number.isNaN(limit)) {
    res.status(400).send("Bad Request")
  } else {
    res.json(users.slice(0, limit))
  }
}

const show = (req, res) => {
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
}

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (Number.isNaN(id)) {
    return res.status(400).end()
  }
  users = users.filter((user) => user.id !== id)
  res.status(204).end()
}

const create = (req, res) => {
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
}

module.exports = {
  index,
  show,
  destroy,
  create,
}
