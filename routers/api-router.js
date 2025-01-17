const router = require("express").Router();
const userRouter = require("./user-router");
const authRouter = require("./auth-router");
const productRouter = require("./product-router");
const categoryRouter = require("./category-router");
const subcategoryRouter = require("./subcategory-router");
const subsubcategoryRouter = require("./subsubcategory-router");

router.use("/auth", authRouter);

router.use("/users", userRouter);

router.use("/products", productRouter);

router.use("/categories", categoryRouter);

router.use("/subcategories", subcategoryRouter);

router.use("/subsubcategories", subsubcategoryRouter);

module.exports = router;
