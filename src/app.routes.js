const {Router} = require("express");
const {AuthRouter} = require("./modules/auth/auth.routes");
const {UserRouter} = require("./modules/user/user.routes");
const {CategoryRouter} = require("./modules/category/category.routes");
const {OptionRoutes} = require("./modules/option/option.routes");
const {PostRouter} = require("./modules/post/post.routes");

const mainRouter = Router();

mainRouter.use("/auth", AuthRouter);
mainRouter.use("/profile", UserRouter);
mainRouter.use("/categories", CategoryRouter);
mainRouter.use("/filters", OptionRoutes);
mainRouter.use("/ads", PostRouter);
// mainRouter.get("/", postController.postList);

module.exports = mainRouter;