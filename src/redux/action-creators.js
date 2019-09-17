
import { SAVE_USER ,REMOVE_USER,SET_TITLE,GET_CATEGORIES_SUCCESS,ADD_CATEGORY_SUCCESS,UPDATE_CATEGORY_SUCCESS,DELETE_CATEGORY_SUCCESS} from './action-types';
import { reqGetCategories,reqAddCategory ,reqUpdateCategory,reqDeleteCategory} from '@api';

export const saveUser = (user) => ({type: SAVE_USER, data: user});

export const removeUser= () => ({ type: REMOVE_USER});

export  const setTitle= (title) => ({type: SET_TITLE,data: title});

const getCategoriesSuccess= (categories) => ({type:GET_CATEGORIES_SUCCESS,data:categories});
export const getCategories = () => {
    return async (dispatch) => {
        const result=await reqGetCategories();
        dispatch(getCategoriesSuccess(result));
    }
};
const addCategorySuccess = (category) => ({type: ADD_CATEGORY_SUCCESS, data: category});
export const addCategory = (categoryName) => {
    return async (dispatch) => {
        const result = await reqAddCategory(categoryName);
        dispatch(addCategorySuccess(result));
    }
};
const updateCategorySuccess = (category) => ({type: UPDATE_CATEGORY_SUCCESS, data: category});
export const updateCategory = (categoryId, categoryName) => {
    return async (dispatch) => {
        const result = await reqUpdateCategory(categoryId, categoryName);
        dispatch(updateCategorySuccess(result));
    }
};

// const deleteCategorySuccess = (category) => ({type: DELETE_CATEGORY_SUCCESS, data: category});
// export const deleteCategory = (categoryId) => {
//     return async (dispatch) => {
//         const result = await reqDeleteCategory(categoryId);
//         dispatch(deleteCategorySuccess(result));
//     }
// };