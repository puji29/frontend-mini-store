const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "http://localhost:3002",
});

const getCategory = () => axiosClient.get("/categories");

const getSliders = () =>
  axiosClient.get("/sliders").then((res) => {
    return res.data;
  });

const getCategoryList = () =>
  axiosClient.get("/categories").then((res) => {
    return res.data;
  });

const getAllProducts = () =>
  axiosClient.get("/products").then((res) => {
    return res.data;
  });

const getProductByCategory = (category) =>
  axiosClient.get("/products/category/" + category).then((res) => {
    return res.data;
  });


const registerUser = (username, email, password) =>
  axiosClient.post("/users", {
    username: username,
    email: email,
    password: password,
  });

const SignIn = (username, password) =>
  axiosClient.post("/login", {
    username: username,
    password: password,
  });

const addToCart = (data, jwt) =>
  axiosClient.post("/carts", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getCartItems = (userId, jwt) =>
  axiosClient.get("/carts/users/" + userId, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  }).then(res=>{
    const data = res.data
    const cartItemsList = data.map((item,index)=>({
      name: item.product.name,
      quantity: item.cart.quantity,
      amount: item.cart.amount,
      image: item.product.url,
      actualStock: item.product.stock,
      id:item.cart.id
    }))

    return cartItemsList
  });

  const deleteCartItem=(id,jwt)=>axiosClient.delete('/carts/'+id,{
    headers: {
      Authorization: "Bearer " + jwt,
    },
  })

export default {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductByCategory,
  registerUser,
  SignIn,
  addToCart,
  getCartItems,
  deleteCartItem
};
