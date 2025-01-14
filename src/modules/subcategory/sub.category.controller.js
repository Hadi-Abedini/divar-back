const autoBind = require("auto-bind");
const SubcategoryService = require("./sub.category.service");
const SubSubcategoryService = require("../subsubcategory/sub.sub.category.service");
const { SubCategoryMessage } = require("./sub.category.message");
const HttpCodes = require("http-codes");
class SubCategoryController {
  #service;
  #service_sub;
  constructor() {
    autoBind(this);
    this.#service = SubcategoryService;
    this.#service_sub = SubSubcategoryService;
  }

  async create(req, res, next) {
    try {
      const { title, slug, category } = req.body;
      await this.#service.create({ title, slug, category });
      return res.status(HttpCodes.CREATED).json({
        message: SubCategoryMessage.Created,
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      const SubCategory = await this.#service.find();
      return res.json(SubCategory);
    } catch (error) {
      next(error);
    }
  }
  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const SubCategory = await this.#service.findById(id);
      const SubSubCategory = await this.#service_sub.findById(SubCategory._id);

      return res.json({ ...SubCategory, items: SubSubCategory });
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.remove(id);
      return res.json({
        message: SubCategoryMessage.Deleted,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SubCategoryController();
