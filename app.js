const express = require("express")
const app = express()
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Brown" },
  { id: 3, name: "Chris" },
  { id: 4, name: "Danny" },
]

// 클라이언트로부터 root 경로로 요청이 들어오면 두 번째 인자로 받은 콜백 함수를 실행한다.
// res.send는 res.status(), res.setHeader(), res.end()가 했던 동작을 단 하나의 함수로 가능하게 해준다.
app.get("/", (req, res) => res.send("Hello World!"))
// res.send는 문자열을 인자로 가지므로, 객체를 클라이언트에게 json 형식으로 전달할 때는 res.json 함수를 사용한다.

// 유저 목록을 조회하는 API
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

// 유저를 조회하는 API
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

// 어플리케이션을 외부에서도 사용할 수 있도록 모듈로 만들어준다.
module.exports = app
