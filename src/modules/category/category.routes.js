const { Router } = require("express");
const categoryController = require("./category.controller");
const AuthorizationAdmin = require("../../common/guard/authorization.guard");

const router = Router();
router.post("/", categoryController.create)
router.get("/", categoryController.find)
router.get("/:id", categoryController.findById);
router.delete("/:id", categoryController.remove)
module.exports = {
    CategoryRouter: router
}