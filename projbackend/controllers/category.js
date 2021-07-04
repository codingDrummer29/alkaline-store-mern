const CategoryModel = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  CategoryModel.findById(id).exec((err, resCategoty) => {
    if (err) {
      res.status(400).json({
        err: "Category not found in DB",
      });
    }
    req.category = resCategoty;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new CategoryModel(req.body);

  category.save((err, resCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save the category in the DB",
      });
    }
    res.json({ resCategory });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  CategoryModel.find().exec((err, allCategories) => {
    if (err) {
      res.status(400).json({
        error: "No Categoried Found!",
      });
    }
    res.json(allCategories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      res.status(400).json({
        error: "FAILED to update the category",
      });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;

  category.remove((err, removedCategory) => {
    if (err) {
      res.status(400).json({
        error: "FAILED to Delete this category",
      });
    }
    res.json({
      message: `${removedCategory.name} category is Successfully Deleted`,
    });
  });
};
