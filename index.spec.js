const assert = require("assert")
const should = require("should")
const request = require("supertest")
const app = require("./app")

describe("GET /users", () => {
  // 첫번째 인자에는 test spec 작성
  // 두번째 인자의 콜백 함수에 들어가는 done이라는 인자는,
  // 응답 객체의 검증이 완료된 후에 완료 여부를 mocha에게 알려준다.
  // 서버를 구동시키고 요청을 보내고 응답을 받는 과정은 모두 비동기 작업이다.
  it("배열을 반환한다", (done) => {
    request(app)
      .get("/users")
      .end((err, res) => {
        if (err) throw err
        // 응답값이 배열이어야 한다.
        res.body.should.be.instanceof(Array)
        // 배열 안의 요소들은 name이라는 key를 가지고 있어야 한다.
        res.body.forEach((user) => {
          user.should.have.property("name")
        })
        done()
      })
  })
  it("최대 limit 갯수만큼 응답한다.", (done) => {
    request(app)
      .get("/users?limit=2")
      .end((err, res) => {
        if (err) throw err
        // 응답값의 길이는 2여야 한다.
        res.body.should.have.lengthOf(2)
        done()
      })
  })
})
