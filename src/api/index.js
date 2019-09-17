/*
 封装发送请求函数
 */
import axios from './request';

export const reqLogin = (username, password) => axios.post('/login', { username, password });

export const reqGetCategories =() => axios.get('/category/get');

export const reqAddCategory = (categoryName) => axios.post('/category/add',{ categoryName });

export  const  reqUpdateCategory= (categoryId,categoryName) =>axios.post('/category/update',{ categoryId,categoryName});

// export const reqDeleteCategory = (categoryId) => axios.post('/category/delete',{ categoryId });

export const  reqGetProducts= (pageNum,pageSize) => axios.get('/product/list',{params:{pageNum,pageSize}});

export const reqAddProduct=({name,desc,price,categoryId,detail})=>axios.post('/product/add',{name,desc,price,categoryId,detail});

export const reqUpdateProduct = ({name, desc, price, categoryId, detail, productId}) => axios.post('/product/update', { name, desc, price, categoryId, detail, productId });

export const reqSearchProducts=({searchKey,searchValue,pageNum,pageSize})=> axios.get('/product/search',{params:{[searchKey]:searchValue,pageNum,pageSize}});