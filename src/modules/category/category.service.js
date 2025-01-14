const autoBind = require("auto-bind");
const CategoryModel = require("./category.model");
const OptionModel = require("../option/option.model");
const createHttpError = require("http-errors");
const { CategoryMessage } = require("./category.message");
const { default: slugify } = require("slugify");

class CategoryService {
  #model;
  #optionModel;
  constructor() {
    autoBind(this);
    this.#model = CategoryModel;
    this.#optionModel = OptionModel;
  }

  async find() {
    return await this.#model.find({});
  }

  async findById(id) {
    const category = await this.#model.findById(id);

    if (!category) {
      throw new createHttpError.NotFound(CategoryMessage.NotFound);
    }
    return category;
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

module.exports = new CategoryService();
