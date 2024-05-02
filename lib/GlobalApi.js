const { default: axios } = require("axios");

const axiosClient = axios.create({
    baseURL: 'http://localhost:3002'
})

const getCategory =()=> axiosClient.get('/categories')

const getSliders =() => axiosClient.get('/sliders').then(res=>{
    return res.data
})

const getCategoryList = () => axiosClient.get('/categories').then(res=>{
    return res.data
})

const getAllProducts =()=> axiosClient.get('/products').then(res=>{
    return res.data
})

const getProductByCategory =(category)=> axiosClient.get('/products/category/'+category).then(res=>{
    return res.data
})

const registerUser = (username,email,password)=>axiosClient.post('/users',{
    username:username,
    email:email,
    password:password
});

const SignIn=(username,password)=>axiosClient.post('/login',{
    username:username,
    password:password
}
    
)

export default {
    getCategory,
    getSliders,
    getCategoryList,
    getAllProducts,
    getProductByCategory,
    registerUser,
    SignIn
}