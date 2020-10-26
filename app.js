const express = require("express")
const logger = require("morgan")
const bodyParser = require("body-parser")
const app = express()
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Brown" },
  { id: 3, name: "Chris" },
  { id: 4, name: "Danny" },
]

// ! bodyParser를 어플리케이션에 추가
app.use(logger("dev"))
// application/json 파일을 파싱하기 위해
app.use(bodyParser.json())
// application/x-www-form-encoded 파일을 파싱하기 위해
app.use(bodyParser.urlencoded({ extended: true }))

// 클라이언트로부터 root 경로로 요청이 들어오면 두 번째 인자로 받은 콜백 함수를 실행한다.
// res.send는 res.status(), res.setHeader(), res.end()가 했던 동작을 단 하나의 함수로 가능하게 해준다.
app.get("/", (req, res) => res.send("Hello World!"))
// res.send는 문자열을 인자로 가지므로, 객체를 클라이언트에게 json 형식으로 전달할 때는 res.json 함수를 사용한다.

// ! 유저 목록을 조회하는 API
app.get("/users", (req, res) => {
  // req.query : 이를 이용하여 query string에 접근할 수 있다.
  // limit을 요청하지 않으면 기본값은 10이다.
  req.query.limit = req.query.limit || 10
  // limit을 10진수의 숫자로 변경한다.
  const limit = parseInt(req.query.limit, 10)
  // parseInt(문자열)은 NaN을 반환한다.
  if (Number.isNaN(limit)) {
    res.status(400).send("Bad Request")
  } else {
    // limit 갯수만큼만 응답한다.
    res.json(users.slice(0, limit))
  }
})

// ! 유저를 조회하는 API
app.get("/users/:id", (req, res) => {
  // id 값을 얻어낸다.
  const id = parseInt(req.params.id, 10)
  // id가 숫자가 아닐 경우
  if (Number.isNaN(id)) {
    return res.status(400).end()
  } else {
    // users 배열 조회
    const currentUser = users.find((user) => user.id === id)
    // id로 유저를 찾을 수 없는 경우
    if (!currentUser) {
      return res.status(404).end()
    }
    // 유저가 존재하면, 유저 데이터를 넣어 응답한다.
    res.json(currentUser)
  }
})

// ! 유저를 delete하는 API
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (Number.isNaN(id)) {
    // id가 숫자가 아닐경우 400
    return res.status(400).end()
  }
  users = users.filter((user) => user.id !== id)
  res.status(204).end()
})

// ! 유저를 추가하는 API
// app.post(), req.body, body-parser
app.post("/users", (req, res) => {
  // req.body를 읽어오려면 body-parser라는 써드파티 라이브러리가 필요하다.
  const name = req.body.name
  // name 값이 없다면
  if (!name) {
    // 400 d응답('nof found')
    return res.status(400).end()
  }

  const foundUser = users.find((user) => user.name === name)
  // 요청으로 들어온 name 값과 중복인 user가 존재하면
  if (foundUser) {
    // 409 응답('conflict)
    return res.status(409).end()
  }

  // 현재 시각을 id 값으로
  const id = Date.now()
  const newUser = { id, name }
  users.push(user)
  // 생성되었음을 의미하는 201 status code와 새로 생성된 유저 객체를 응답으로 보내준다.
  res.status(201).json(newUser)
})

// 어플리케이션을 외부에서도 사용할 수 있도록 모듈로 만들어준다.
module.exports = app
