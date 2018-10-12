// helper functions
const Category = require("../model/category");


const getIdBYcategoryName = async name => {
  name = name.replace("-", " ");
  category = await Category.findOne({ title:  new RegExp('\\b' + name + '\\b', 'i') });
  if (category) return category.id;
  return false;
};

module.exports = { getIdBYcategoryName };
