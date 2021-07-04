const ProductModel = require("../models/product");

const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs"); // file-system
const { sortBy } = require("lodash");

exports.getProductById = (req, res, next, id) => {
  ProductModel.findById(id)
    .populate("category")
    .exec((err, resProduct) => {
      // if (err || !product) { DEBUG:
      if (err) {
        res.status(400).json({
          error: "No Product with such id found in the DB",
        });
      }
      req.product = resProduct;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtentions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with Image",
      });
    }

    // TODO: restriction on fields - DONE:
    // destructuring the fields
    // FIXME: postman showing enter all fields
    // DEBUG: remove photo from initial restriction
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let localProduct = new ProductModel(fields);

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File sixe too big",
        });
      }
      localProduct.photo.data = fs.readFileSync(file.photo.path);
      localProduct.photo.contentType = file.photo.type;
    }
    console.log(localProduct);
    // save to the DB
    localProduct.save((err, resProduct) => {
      if (err) {
        return res.status(400).json({
          error: "Saving Tshirt in DB Failed",
        });
      }
      console.log("product save success");
      res.json(resProduct);
    });
  });
};

// read - with performence optimization
exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};
// middleware - photo
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

// update
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtentions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with Image",
      });
    }

    // updation code
    let localProduct = req.product;
    localProduct = _.extend(localProduct, fields);

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File sixe too big",
        });
      }
      localProduct.photo.data = fs.readFileSync(file.photo.path);
      localProduct.photo.contentType = file.photo.type;
    }
    // console.log(localProduct);

    // save to the DB
    localProduct.save((err, resProduct) => {
      if (err) {
        return res.status(400).json({
          error: "Updation of the product Failed",
        });
      }
      console.log("product save success");
      res.json(resProduct);
    });
  });
};

// delete
exports.removeProduct = (req, res) => {
  let localProduct = req.product;
  localProduct.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: `Failed to Delete the product ${deletedProduct.name}`,
      });
    }
    res.json({
      message: `Successfully Deleted ${deletedProduct.name}`,
      deletedProduct,
    });
  });
};

// products listing
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  ProductModel.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "ascending"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No Product found",
        });
      }
      res.json(products);
    });
};

// listing products under unique categories
exports.getAllUniqueCategories = (req, res) => {
  ProductModel.distinct("category", {}, (err, resCategory) => {
    if (err) {
      return res.status(400).json({
        error: "No category found",
      });
    }
    res.json(resCategory);
  });
};

// middleware for stock update
exports.updateStock = (req, res, next) => {
  let myOperatios = req.body.order.products.map((product) => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: {
          $increament: {
            stock: -product.count,
            sold: +product.count,
            // prod.count comes from frontend
          },
        },
      },
    };
  });

  ProductModel.bulkWrite(myOperatios, {}, (err, resProducts) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation Failed",
      });
    }
    next();
  });
};
