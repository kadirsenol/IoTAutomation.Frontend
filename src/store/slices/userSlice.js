import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({

    name:'user',
    initialState:{
        isLogin: false,
        role:"",
        name:"",
        surName:""
    },
    reducers: {
        setLogin: (state)=>{
          state.isLogin = true  
        },
        setLogout: (state)=>{
            state.isLogin = false
        },
        setRole:(state,actions)=>{
            state.role = actions.payload
        },
        setName:(state,actions)=>{
            state.name = actions.payload
        },
        setSurname:(state,actions)=>{
            state.surName = actions.payload
        }

    }
})

export const {setLogin,setLogout,setRole,setName,setSurname} = userSlice.actions
export default userSlice.reducer

