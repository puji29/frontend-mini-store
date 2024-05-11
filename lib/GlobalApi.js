const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "https://mini-store.my.id.pujilaksono.my.id",
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
      id:item.cart.id,
      productId:item.product.id,
      
    }))

    return cartItemsList
  });

  const deleteCartItem=(id,jwt)=>axiosClient.delete('/carts/'+id,{
    headers: {
      Authorization: "Bearer " + jwt,
    },
  })

  const createOrder = (data,jwt)=>axiosClient.post("/orders",data,{
    headers: {
      Authorization: "Bearer " + jwt,
    },
  })

  const getMyOrder = (userId, jwt) => 
    axiosClient.get("/orders/" + userId, {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    })
    .then(res => {
      const response = res.data.data;
      const orderList = response.map((item => ({ 
        username: item.username,
        email: item.email,
        phone: item.phone,
        zip: item.zip,
        address: item.address,
        totalOrderAmount: item.totalOrderAmount,
        userId: item.userId,
        paymentId: item.paymentId,
        status:item.status,
        orderItemList: item.orderItemList,
        createdAt: item.createdAt
      })));
      return orderList; // return the orderList
    });

  
  

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
  deleteCartItem,
  createOrder,
  getMyOrder
};
