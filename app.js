// 오로지 서버를 구성하는 기능만 수행하고 있는 파일.

const express = require("express")
const logger = require("morgan")
const bodyParser = require("body-parser")
const app = express()
const userRouter = require("./api/user")

// ! 미들웨어를 어플리케이션에 추가
app.use(logger("dev"))
// application/json 파일을 파싱하기 위해
app.use(bodyParser.json())
// application/x-www-form-encoded 파일을 파싱하기 위해
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => res.send("Hello World!"))
// users 경로에 대해서 라우팅을 할 때는 userRouter가 담당한다.
app.use("/users", userRouter)

// 어플리케이션을 외부에서도 사용할 수 있도록 모듈로 만들어준다.
module.exports = app
