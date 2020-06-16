const Category = require('../models/category');

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.json({
        Error: 'Category Not Found',
      });
    }
    return (req.category = cate);

    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, cate) => {
    if (err) {
      return res.json({
        Error: 'Not able to Add Category',
      });
    }
    return res.json({ cate });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.json({
        Error: 'Not able to fetch Categories',
      });
    }
    return res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.json({
        Error: 'Not able to Update Category',
      });
    }
    return res.json({ updatedCategory });
  });
};

exports.deleteCategory = (req, res) => {
  const category = req.category;
  category.remove((err, deletedCategory) => {
    if (err) {
      return res.json({
        Error: 'Not able to Delete Category',
      });
    }
    return res.json({ msg: 'Category Deletion SuccessFull' });
  });
};
