
const { getQueryDateTime } = require('../../utils');
const {
  Product,
  Category,
  Supplier,
  Customer,
  Order,
} = require('../../models');

module.exports = {
  question1: async (req, res, next) => {

    try {
      console.log('««««« hiiii »»»»»');
      const conditionFind = {
        discount: { $gt: 10 },
      };

      let results = await Product.find(conditionFind);
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« 2222 »»»»»');
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question1a: async (req, res, next) => {
    try {
      const { discount } = req.query;

      const conditionalFind = {
        discount: { $gte: discount },
      };

      let results = await Product.find(conditionalFind).populate('category supplier');
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResults: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  getList: async (req, res, next) => { // NOTE
    try {
      const { page, pageSize } = req.query; // 10 - 1
      const limit = pageSize || 10; // 10
      const skip = limit * (page - 1) || 0;

      const conditionFind = { isDeleted: false };

      let results = await Product.find(conditionFind)
        .populate('category')
        .populate('supplier')
        .skip(skip)
        .limit(limit)
        .sort({ "name": 1, "price": 1, "discount": -1 })
        .lean();

      const total = await Product.countDocuments(conditionFind)

      return res.send({ code: 200, total, count: results.length, payload: results });
    } catch (err) {
      return res.send(404, {
        message: "Không tìm thấy",
        err,
      });
    }
  },

};
