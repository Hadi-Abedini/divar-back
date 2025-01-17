const router = require("express").Router();
const { asyncHandler } = require("../utils/async-handler");
const { validator } = require("../validations/validator");
const {
  addSubsubcategoryValidationSchema,
  editSubsubcategoryValidationSchema,
} = require("../validations/subsubcategory-validation");
const {
  getAllSubsubcategories,
  addSubsubcategory,
  getSubsubcategoryById,
  removeSubsubcategoryById,
  editSubsubcategoryById,
} = require("../controllers/subsubcategory-controller");

router.get("/", asyncHandler(getAllSubsubcategories));

router.post(
  "/",
  validator(addSubsubcategoryValidationSchema),
  asyncHandler(addSubsubcategory)
);

router.get("/:id", asyncHandler(getSubsubcategoryById));

router.patch(
  "/:id",
  validator(editSubsubcategoryValidationSchema),
  asyncHandler(editSubsubcategoryById)
);

router.delete("/:id", asyncHandler(removeSubsubcategoryById));

module.exports = router;
