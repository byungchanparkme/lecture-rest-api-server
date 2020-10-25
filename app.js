const express = require("express")
const app = express()
const users = [{ name: "Ron" }, { name: "Alice" }]

// 클라이언트로부터 root 경로로 요청이 들어오면 두 번째 인자로 받은 콜백 함수를 실행한다.
// res.send는 res.status(), res.setHeader(), res.end()가 했던 동작을 단 하나의 함수로 가능하게 해준다.
app.get("/", (req, res) => res.send("Hello World!"))
// res.send는 문자열을 인자로 가지므로, 객체를 클라이언트에게 json 형식으로 전달할 때는 res.json 함수를 사용한다.
app.get("/users", (req, res) => res.json(users))

app.listen(3000, () => console.log("running"))
