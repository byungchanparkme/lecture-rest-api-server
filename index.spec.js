const assert = require("assert")
const should = require("should")
const request = require("supertest")
const app = require("./app")

describe("GET /users", () => {
  // 성공하는 경우와 실패하는 경우를 나눠준다.
  describe("성공", () => {
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
  describe("실패", () => {
    it("limit이 정수가 아니면 400을 응답한다", (done) => {
      request(app)
        .get("/users?limit=two")
        // 상태값만 따로 체크해준다.
        // limit이 숫자가 아니기 때문에 status code는 400이 와야 한다. 그것으로 테스트는 끝난다.
        .expect(400)
        .end(done)
    })
  })
})
