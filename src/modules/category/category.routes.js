const { Router } = require("express");
const categoryController = require("./category.controller");
const AuthorizationAdmin = require("../../common/guard/authorization.guard");

const router = Router();
router.post("/",AuthorizationAdmin, categoryController.create)
router.get("/", categoryController.find)
router.get("/:id", categoryController.findById);
router.delete("/:id",AuthorizationAdmin, categoryController.remove)
module.exports = {
    CategoryRouter: router
}