const express = require("express")
// 요청에 대한 로깅 메세지를 보여준다.
const logger = require("morgan")
const app = express()

app.use(logger("dev"))

app.listen(3000, () => console.log("running"))
