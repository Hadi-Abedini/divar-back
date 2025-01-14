const autoBind = require("auto-bind");
const SubCategoryModel = require("./sub.category.model");
const SubSubcategoryService = require("../subsubcategory/sub.sub.category.service");
const createHttpError = require("http-errors");
const { CategoryMessage } = require("./sub.category.message");
const { default: slugify } = require("slugify");

class SubCategoryService {
  #model;
  #subServe;
  constructor() {
    autoBind(this);
    this.#model = SubCategoryModel;
    this.#subServe = SubSubcategoryService;
  }

  async find() {
    const subCategories = await this.#model.find({});
    for (let subCategory of subCategories) {
      const subSubCategories = await this.#subServe.findById(subCategory._id.toString());      
      subCategory.items = subSubCategories;
    }
    
    return subCategories;
  }

  async findById(id) {
    const temp = await this.#model.find({});
    const subCategories = temp.filter((item) => item.category === id) || [];

    for (let subCategory of subCategories) {
      const subSubCategories = await this.#subServe.findById(subCategory._id.toString());    
      subCategory.items = subSubCategories;
    }
    
    return subCategories;
  }

  async remove(id) {
    await this.checkExistById(id);
    // await this.#optionModel.deleteMany({ category: id }).then(async () => {
    await this.#model.deleteMany({ _id: id });
    // });
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

module.exports = new SubCategoryService();
