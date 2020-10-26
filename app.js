const express = require("express")
const logger = require("morgan")
const bodyParser = require("body-parser")
const app = express()
const userRouter = require("./api/user")

// ! bodyParser를 어플리케이션에 추가
app.use(logger("dev"))
// application/json 파일을 파싱하기 위해
app.use(bodyParser.json())
// application/x-www-form-encoded 파일을 파싱하기 위해
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => res.send("Hello World!"))
app.use('/users',  userRouter)

// 어플리케이션을 외부에서도 사용할 수 있도록 모듈로 만들어준다.
module.exports = app
