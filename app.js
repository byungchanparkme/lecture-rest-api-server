const express = require("express")
// 요청에 대한 로깅 메세지를 보여준다.
const logger = require("morgan")
const app = express()

const mw = (req, res, next) => {
  // throw Error("error!")
  next()
}
// 에러 미들웨어는 이전의 미들웨어들이 호출되는 과정 중에 에러가 발생하지 않는다면 호출되지 않는다.
// 오로지 에러가 발생할 때만 이를 감지한다.
const errorMw = (err, req, res, next) => {
  console.log(err.message)
}

app.use(logger("dev"))
app.use(mw)
app.use(errorMw)

app.listen(3000, () => console.log("running"))
