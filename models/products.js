const { DataTypes } = require('sequelize');
const connection = require('../db-config/connect');

// create database using models
const Products = connection.define('products', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productName: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.INTEGER,
  },
}, {
  freezeTableName: true,
});

const createProduct = (productName, category, price) => {
  // sequelize syntax for insert into database
  Products.create({ productName, category, price }).then((data) => {
    console.log(data.toJSON());
  });
};

const selectAll = () => {
  // sequelize syntax for select all from products table
  Products.findAll({ attributes: ['productName', 'category', 'price'] }).then((data) => {
    data.forEach((element) => {
      console.log(element.toJSON());
    });
  });
};

const selectById = (id) => {
  // sequelize syntax for filtering by id
  Products.findAll({ attributes: ['productName', 'category', 'price'], where: { product_id: id } }).then((data) => {
    data.forEach((element) => {
      console.log(element.toJSON());
    });
  });
};

const updateProduct = (id, productName, category, price) => {
  // sequelize syntax for updating database
  Products.update({ productName, category, price }, { where: { product_id: id } }).then((data) => {
    data.forEach((element) => {
      console.log(element.toJSON());
    });
  });
};

const deleteProduct = (id) => {
  // sequelize syntax to deleting row
  Products.destroy({ where: { product_id: id } });
};

module.export = {
  createProduct,
  selectAll,
  selectById,
  updateProduct,
  deleteProduct,
};
