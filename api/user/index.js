const express = require("express")
const userRouter = express.Router()
const ctrl = require("./user.ctrl")

// ! 유저 목록을 조회하는 API
// 두 번째 인자는 controller 함수
userRouter.get("/", ctrl.index)

// ! 유저를 조회하는 API
userRouter.get("/:id", ctrl.show)

// ! 유저를 delete하는 API
userRouter.delete("/:id", ctrl.destroy)

// ! 유저를 추가하는 API
userRouter.post("/", ctrl.create)

module.exports = userRouter
