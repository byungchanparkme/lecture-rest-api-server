const assert = require("assert")
const should = require("should")
const request = require("supertest")
const app = require("./app")

describe("GET /users", () => {
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
})
