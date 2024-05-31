
import { createSlice } from "@reduxjs/toolkit";


export const adminSlice = createSlice({

    name:'admin',
    initialState:{
        pageAdmin:"Dashboard",
        isGetUser:false,
        isGetSolution:false,
        isGetSmartLightApp:false,
        isGetPreOrder:false,
        isGetPreOrderDetail:false,
        isGetProfileImage : false


    },
    reducers:{
        setPageAdmin:(state, actions)=>{
            state.pageAdmin = actions.payload
        },
        setIsGetUser:(state)=>{
            state.isGetUser = !state.isGetUser
        },
        setIsGetSolution:(state)=>{
            state.isGetSolution = !state.isGetSolution
        },
        setIsGetSmartLightApp:(state)=>{
            state.isGetSmartLightApp = !state.isGetSmartLightApp
        },
        setIsGetPreOrder:(state)=>{
            state.isGetPreOrder = !state.isGetPreOrder
        },
        setIsGetPreOrderDetail:(state)=>{
            state.isGetPreOrderDetail = !state.isGetPreOrderDetail
        },
        setIsGetProfileImage:(state)=>{
            state.isGetProfileImage = !state.isGetProfileImage
        }

        
    }
})

export const {setPageAdmin,setIsGetUser,setIsGetSolution,setIsGetSmartLightApp,setIsGetPreOrder,setIsGetPreOrderDetail,setIsGetProfileImage} = adminSlice.actions
export default adminSlice.reducer