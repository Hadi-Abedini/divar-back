const autoBind = require("auto-bind");
const SubSubCategoryService = require("./sub.sub.category.service");
const { SubSubCategoryMessage } = require("./sub.sub.category.message");
const HttpCodes = require("http-codes");
class SubSubCategoryController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = SubSubCategoryService;
  }

  async create(req, res, next) {
    try {
      const { title, slug, sub_category } = req.body;
      await this.#service.create({ title, slug, sub_category });
      return res.status(HttpCodes.CREATED).json({
        message: SubSubCategoryMessage.Created,
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      const subSubCategory = await this.#service.find();
      return res.json(subSubCategory);
    } catch (error) {
      next(error);
    }
  }
  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const subSubCategory = await this.#service.findById(id);
      return res.json({subSubCategory});
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.remove(id);
      return res.json({
        message: SubSubCategoryMessage.Deleted,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SubSubCategoryController();
