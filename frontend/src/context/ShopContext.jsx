import React, { createContext, useEffect, useState } from 'react'
// import all_product from '../components/assets/all_product'

export const ShopContext = createContext('null')

const getDefaultCart = ()=>{
    let cart = {};
    for(let index=0; index < 301; index++){
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) =>{
    
    const [all_product, setAll_product] = useState([])
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(()=>{
         fetch('http://localhost:4000/allproducts').then((res)=>res.json()).then((data)=>setAll_product(data))

         if(localStorage.getItem("auth-token")){
            fetch('http://localhost:4000/getcart',{
                method: 'GET',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                // body: ""
            })
            .then((res)=>res.json())
            .then((data)=>setCartItems(data))
         }
    },[])
    
    const addToCart = async(itemId) =>{

        if(localStorage.getItem('auth-token')){
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
            await fetch('http://localhost:4000/addtocart',{
                method: 'POST',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({"itemId": itemId}),
            })
            .then((res)=>res.json())
            .then((data)=>alert(data.message))
        }
        else{
            alert("You need to login to add items to cart")
        }
        console.log(cartItems)
    }
    
    const removeFromCart = async(itemId) =>{
        if(localStorage.getItem('auth-token')){
            setCartItems((prev)=>({...prev, [itemId]: prev[itemId]-1}))
            await fetch('http://localhost:4000/removefromcart',{
                method: 'POST',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({"itemId": itemId}),
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data.message))
        }
        else{
            alert("You need to login to add items to cart")
        }
    }

    const getTotalAmount = ()=>{
        let TotalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                TotalAmount += itemInfo.new_price * cartItems[item]
            }
        }
        return TotalAmount
    }
    const getTotalCartItems = ()=>{
        let totalItems = 0
        for(const item in cartItems){
            if(cartItems[item] > 0){
                totalItems+= cartItems[item]
            }
        }
        return totalItems
    }
    
    const contextValue = {all_product, cartItems, addToCart, removeFromCart, getTotalAmount, getTotalCartItems}

    return (
        <ShopContext.Provider value ={contextValue} >
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider