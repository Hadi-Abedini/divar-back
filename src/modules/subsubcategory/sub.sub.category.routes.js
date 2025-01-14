const { Router } = require("express");
const SubSubCategoryController = require("./sub.sub.category.controller");
const AuthorizationAdmin = require("../../common/guard/authorization.guard");

const router = Router();
router.post("/", SubSubCategoryController.create)
router.get("/", SubSubCategoryController.find)
router.delete("/:id", SubSubCategoryController.remove)
module.exports = {
    SubSubCategoryRouter: router
}