const http = require("http")

const hostname = "127.0.0.1"
const port = 3000

const server = http.createServer((req, res) => {
  // req.url은 경로에 대한 정보를 담고 있다.
  if (req.url === "/") {
    // 200 => 요청 성공
    res.statusCode = 200
    res.setHeader("Content-Type", "text/plain")
    // res.end는 문자열을 인자로 가지는데 이를 응답 본문에 추가할 수 있고, 응답 프로세스를 종료하는 데 사용된다.
    res.end("Hello World\n")
  } else if (req.url === "/users") {
    const users = [{ name: "Alice" }, { name: "Beck" }]
    res.statusCode = 200
    // json 파일로 응답을 보낼 때에는 헤더의 Content-Type은 application/json이다.
    res.setHeader("Content-Type", "application/json")
    // res.end로 응답을 해줄 때에는 인자로 반드시 문자열이 들어가야 한다.
    // JSON.stringify 메소드를 이용하여 데이터를 JSON 파일(문자열 형태)로 변환한다.
    res.end(JSON.stringify(users))
  } else {
    // 404 => 요청 실패
    res.statusCode = 404
    res.setHeader("Content-Type", "text/plain")
    res.end("Not Found")
  }
})

// 서버가 요청 대기 중인 상태이다. 서버가 성공적으로 실행된다면 콜백 함수가 호출된다.
server.listen(port, hostname, () => {
  console.log(`Server running at https://${hostname}:${port}`)
})
