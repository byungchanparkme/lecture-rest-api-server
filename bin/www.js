// 서버를 구동할 때는 www.js 파일 실행을 해준다.
const app = require("../app")

app.listen(3000, () => console.log("running"))
