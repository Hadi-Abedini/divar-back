const { AppError } = require('../utils/app-error');
const Category = require('../models/category-model');
const Subcategory = require('../models/subcategory-model');
const { ApiFeatures } = require('../utils/api-features');

// ** controllers
const getAllSubcategories = async (req, res, next) => {
	const subcategoriesModel = new ApiFeatures(Subcategory.find({}).populate('subsubcategories'), req.query)
		.limitFields()
		.paginate()
		.filter()
		.sort();

	const subcategories = await subcategoriesModel.model;

	const { page = 1, limit = 10 } = req.query;
	const totalModels = new ApiFeatures(Subcategory.find(), req.query).filter();
	const total = await totalModels.model;

	const totalPages = Math.ceil(total.length / Number(limit));

	res.status(200).json({
		status: 'success',
		page: Number(page),
		per_page: Number(limit),
		total: total.length,
		total_pages: totalPages,
		data: { subcategories }
	});
};

//? done: split duplication validation: pre hook
const addSubcategory = async (req, res, next) => {
	console.log(req.body);
	
	const { category, title: subcategoryName } = req.body;

	const isCategoryExists = await Category.findOne({ _id: category });
		if (!isCategoryExists) {
		return next(new AppError(404, `category: ${category} not found`));
	}

	const subcategory = await Subcategory.create({
		category,
		title: subcategoryName
	});

	res.status(201).json({
		status: 'success',
		data: { subcategory }
	});
};

//? done: fix populate option
const getSubcategoryById = async (req, res, next) => {
	const { id: subcategoryId } = req.params;

	const subcategory = await Subcategory.findById(subcategoryId).populate(
		'category'
	);

	if (!subcategory) {
		return next(new AppError(404, `subcategory: ${subcategoryId} not found`));
	}

	res.status(200).json({
		status: 'success',
		data: { subcategory }
	});
};

//? done: code split for duplication validation: pre hook, fix populate option
const editSubcategoryById = async (req, res, next) => {
	const { id: subcategoryId } = req.params;
	let { category: categoryId = null, title: subcategoryName } = req.body;

	const subcategory = await Subcategory.findById(subcategoryId);
	if (!subcategory) {
		return next(new AppError(404, `subcategory: ${subcategoryId} not found`));
	}

	const duplicateSubcategory = await Subcategory.findOne({
		title: subcategoryName
	});
	if (
		!!duplicateSubcategory &&
		subcategory.title !== duplicateSubcategory.title
	) {
		return next(
			new AppError(
				409,
				'subcategory title is already exists. choose a different subcategory title'
			)
		);
	}

	// patch update when categoryId not provided(nullish)
	categoryId ??= subcategory.category;

	const category = await Category.findById(categoryId);
	if (!category) {
		return next(new AppError(404, `category: ${categoryId} not found`));
	}

	subcategory.title = subcategoryName;
	subcategory.category = categoryId;
	await subcategory.save();

	res.status(200).json({
		status: 'success',
		data: { subcategory }
	});
};

//* done
const removeSubcategoryById = async (req, res, next) => {
	const { id: subcategoryId } = req.params;

	const subcategory = await Subcategory.findByIdAndDelete(subcategoryId);

	if (!subcategory) {
		return next(new AppError(404, `subcategory: ${subcategoryId} not found`));
	}

	res.status(200).json({
		status: 'success',
		data: { subcategory }
	});
};

module.exports = {
	addSubcategory,
	getAllSubcategories,
	getSubcategoryById,
	editSubcategoryById,
	removeSubcategoryById
};
