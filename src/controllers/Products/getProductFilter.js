const db = require("../../db");


const getFilteredProducts = async (category, min, max, order) => {
  let products = await db.Product.findAll();

  if (category && category !== "Categories") {
    products = products.filter((product) => product.category === category);
  }
  if (category) {
    products = products.filter((product) => product.category === category);
  }

  if (min && max) {
    products = products.filter(
      (product) => product.price >= min && product.price <= max
    );
  }

  if (order) {
    if (order === "A-Z") {
      products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === "Z-A") {
      products.sort((a, b) => b.name.localeCompare(a.name));
    } else if (order === "Newest") {
      products.sort((a, b) => a.createdAt - b.createdAt);
    } else if (order === "Oldest") {
      products.sort((a, b) => b.createdAt - a.createdAt);
    } else if (order === "rating") {
      products.sort((a, b) => b.averageRating - a.averageRating);
    } else if (order === "price-high") {
      products.sort((a, b) => b.price - a.price);
    } else if (order === "price-low") {
      products.sort((a, b) => a.price - b.price);
    } else if (order === "discount") {
      products.sort((a, b) => b.discount - a.discount);
    } else {
      throw Error("Invalid order");
    }
  }

  

  return (products);
};

module.exports = getFilteredProducts;
