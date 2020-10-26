// 테스팅 코드를 작성하는 파일
const assert = require("assert")
const should = require("should")
const request = require("supertest")
const app = require("./app")

// 유저 목록 조회
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

// 유저 조회
describe("GET /users/:id", () => {
  describe("성공", () => {
    it("유저 객체를 반환한다", (done) => {
      request(app)
        .get("/users/2")
        .end((err, res) => {
          if (err) throw err
          res.body.should.be.an.instanceOf(Object)
          res.body.should.have.property("id", 2)
          done()
        })
    })
  })
  describe("실패", () => {
    it("id가 숫자가 아닐 경우 400으로 응답한다", (done) => {
      request(app).get("/users/two").expect(400).end(done)
    })
    it("id로 유저를 찾을 수 없을 경우 404로 응답한다", (done) => {
      request(app).get("/users/6").expect(404).end(done)
    })
  })
})

// 유저 삭제
describe("DELETE /users/:id", () => {
  describe("성공", () => {
    it("유저가 성공적으로 삭제되면 204 응답", (done) => {
      request(app).delete("/users/3").expect(204).end(done)
    })
  })
  describe("실패", () => {
    it("id가 숫자가 아닐경우 400", (done) => {
      request(app).delete("/users/three").expect(400).end(done)
    })
  })
})

// 유저 추가
describe("POST /users", () => {
  describe("성공", () => {
    it("201을 응답, 생성한 유저 객체를 응답", (done) => {
      request(app)
        // 요청하는 부분
        .post("/users")
        .send({ name: "Daniel" })
        // 응답하는 부분
        .expect(201)
        .end((err, res) => {
          res.body.should.have.property("name", "Daniel")
          done()
        })
    })
  })
  describe("실패", () => {
    it("name이 없으면 400 응답", (done) => {
      request(app)
        // 빈 객체를 요청으로 보내게 되면
        .post("/users")
        .send({})
        // 400 응답
        .expect(400)
        .end(done)
    })
    it("name이 중복이면 409 응답", (done) => {
      request(app)
        // 중복 테스트를 위해 기존에 있는 name 값을 담은 객체를 요청으로 보내게 되면
        .post("/users")
        .send({ name: "Alice" })
        // 409 응답
        .expect(409)
        .end(done)
    })
  })
})
