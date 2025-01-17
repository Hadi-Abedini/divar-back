const { AppError } = require("../utils/app-error");
const Subcategory = require("../models/subcategory-model");
const Subsubcategory = require("../models/subsubcategory-model");
const { ApiFeatures } = require("../utils/api-features");

// ** controllers
const getAllSubsubcategories = async (req, res, next) => {
  const subsubcategoriesModel = new ApiFeatures(
    Subsubcategory.find({}),
    req.query
  )
    .limitFields()
    .paginate()
    .filter()
    .sort();

  const subsubcategories = await subsubcategoriesModel.model;

  const { page = 1, limit = 10 } = req.query;
  const totalModels = new ApiFeatures(
    Subsubcategory.find(),
    req.query
  ).filter();
  const total = await totalModels.model;

  const totalPages = Math.ceil(total.length / Number(limit));

  res.status(200).json({
    status: "success",
    page: Number(page),
    per_page: Number(limit),
    total: total.length,
    total_pages: totalPages,
    data: { subsubcategories: subsubcategories },
  });
};

//? done: split duplication validation: pre hook
const addSubsubcategory = async (req, res, next) => {
  const { subcategory, title: subcategoryName } = req.body;

	const isSubcategoryExists = await Subcategory.findOne({ _id: subcategory });
		if (!isSubcategoryExists) {
		return next(new AppError(404, `subcategory: ${subcategory} not found`));
	}

  const subsubcategory = await Subsubcategory.create({
    subcategory: subcategory,
    title: subcategoryName,
  });

  res.status(201).json({
    status: "success",
    data: { subcategory: subsubcategory },
  });
};

//? done: fix populate option
const getSubsubcategoryById = async (req, res, next) => {
  const { id: subsubcategoryId } = req.params;

  const subsubcategory = await Subsubcategory.findById(
    subsubcategoryId
  ).populate("subcategory");

  if (!subsubcategory) {
    return next(
      new AppError(404, `subsubcategory: ${subsubcategoryId} not found`)
    );
  }

  res.status(200).json({
    status: "success",
    data: { subsubcategory: subsubcategory },
  });
};

//? done: code split for duplication validation: pre hook, fix populate option
const editSubsubcategoryById = async (req, res, next) => {
  const { id: subsubcategoryId } = req.params;
  let { subcategory: subcategoryId = null, title: subsubcategoryName } =
    req.body;

  const subsubcategory = await Subsubcategory.findById(subsubcategoryId);
  if (!subsubcategory) {
    return next(
      new AppError(404, `subsubcategory: ${subsubcategoryId} not found`)
    );
  }

  const duplicateSubsubcategory = await Subsubcategory.findOne({
    title: subsubcategoryName,
  });
  if (
    !!duplicateSubsubcategory &&
    subsubcategory.title !== duplicateSubsubcategory.title
  ) {
    return next(
      new AppError(
        409,
        "subsubcategory title is already exists. choose a different subsubcategory title"
      )
    );
  }

  // patch update when categoryId not provided(nullish)
  subcategoryId ??= subsubcategory.subcategory;

  const subcategory = await Subcategory.findById(subcategoryId);
  if (!subcategory) {
    return next(new AppError(404, `subcategory: ${subcategoryId} not found`));
  }

  subsubcategory.title = subsubcategoryName;
  subsubcategory.category = subcategoryId;
  await subsubcategory.save();

  res.status(200).json({
    status: "success",
    data: { subsubcategory: subsubcategory },
  });
};

//* done
const removeSubsubcategoryById = async (req, res, next) => {
  const { id: subsubcategoryId } = req.params;

  const subsubcategory = await Subsubcategory.findByIdAndDelete(
    subsubcategoryId
  );

  if (!subsubcategory) {
    return next(
      new AppError(404, `subsubcategory: ${subsubcategoryId} not found`)
    );
  }

  res.status(200).json({
    status: "success",
    data: { subsubcategory: subsubcategory },
  });
};

module.exports = {
  addSubsubcategory,
  getAllSubsubcategories,
  getSubsubcategoryById,
  editSubsubcategoryById,
  removeSubsubcategoryById,
};
