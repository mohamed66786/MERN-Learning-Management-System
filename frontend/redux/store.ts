'use client'
import {configureStore}from "@reduxjs/toolkit"
// import {}




export const store =configureStore({
    reducer:{},
    devTools:false,
    middleware:(getDefaltMiddleware)=>getDefaltMiddleware().concat()
})