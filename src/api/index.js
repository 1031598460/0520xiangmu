/*
 封装发送请求函数
 */
import axios from './request';

export const reqLogin = (username, password) => axios.post('/login', { username, password });

export const reqGetCategories =() => axios.get('/category/get');

export const reqAddCategory = (categoryName) => axios.post('/category/add',{ categoryName });

export  const  reqUpdateCategory= (categoryId,categoryName) =>axios.post('/category/update',{ categoryId,categoryName});