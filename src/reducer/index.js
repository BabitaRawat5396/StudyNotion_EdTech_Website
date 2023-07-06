import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice'
import profileReducer from '../slices/profileSlice'
import cartReducer from '../slices/cartSlice'
import courseSlice from '../slices/courseSlice';
import sectionSlice from '../slices/sectionSlice';
import subsectionSlice from '../slices/subsectionSlice';
import paymentSlice from '../slices/paymentSlice';
import viewCourseSlice from '../slices/viewCourseSlice';
import { setShowSideBar } from '../slices/sideBarSlice';

// All the slices will be combine here
const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseSlice,
    section:sectionSlice,
    subsection:subsectionSlice,
    payment:paymentSlice,
    viewCourse:viewCourseSlice,
    showSidebar:setShowSideBar,
})

export default rootReducer;