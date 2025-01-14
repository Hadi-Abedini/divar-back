const autoBind = require("auto-bind");
const SubSubCategoryModel = require("./sub.sub.category.model");
const createHttpError = require("http-errors");
const { CategoryMessage } = require("./sub.sub.category.message");
const { default: slugify } = require("slugify");

class SubSubCategoryService {
  #model;
  #optionModel;
  constructor() {
    autoBind(this);
    this.#model = SubSubCategoryModel;
  }

  async find() {
    return await this.#model.find({});
  }

  async findById(id) {
    const subSubCategory = await this.#model.find();
    subSubCategory.filter((item) => item.sub_category === id);
    return subSubCategory.filter((item) => item.sub_category === id) || [];
  }

  async remove(id) {
    await this.checkExistById(id);
    await this.#optionModel.deleteMany({ category: id }).then(async () => {
      await this.#model.deleteMany({ _id: id });
    });
    return true;
  }

  async create(categoryDto) {
    const createdCategory = await this.#model.create(categoryDto);
    return createdCategory;
  }

  async checkExistById(id) {
    const category = await this.#model.findById(id);
    if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);
    return category;
  }

  async checkExistBySlug(slug) {
    const category = await this.#model.findOne({ slug });
    if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);
    return category;
  }

  async alreadyExistBySlug(slug) {
    const category = await this.#model.findOne({ slug });
    if (category)
      throw new createHttpError.Conflict(CategoryMessage.AlreadyExist);
    return null;
  }
}

module.exports = new SubSubCategoryService();
