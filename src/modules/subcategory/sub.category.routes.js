const { Router } = require("express");
const SubCategoryController = require("./sub.category.controller");
const AuthorizationAdmin = require("../../common/guard/authorization.guard");

const router = Router();
router.post("/", SubCategoryController.create)
router.get("/", SubCategoryController.find)
router.delete("/:id", SubCategoryController.remove)
module.exports = {
    SubCategoryRouter: router
}