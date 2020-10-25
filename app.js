const express = require("express")
// 요청에 대한 로깅 메세지를 보여준다.

const app = express()

// 로깅하기 위한 미들웨어 정의
const mw = (req, res, next) => {
  console.log("mw")
  // next를 반드시 호출해야 그 다음 어플리케이션의 행동을 수행하게 할 수 있다.
  next()
}
const mw2 = (req, res, next) => {
  console.log("mw2")
  next()
}

app.use(mw)
app.use(mw2)

app.listen(3000, () => console.log("running"))
