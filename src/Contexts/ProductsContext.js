import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import {API} from '../Helpers/Constants'
import {calcSubPrice, calcTotalPrice} from '../Helpers/CalcPrice'
import { auth } from '../Firebase';
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"

export const productContext = createContext()
const INIT_STATE = {
    products: null,
    edit: null,
    paginatedPages: 1,
    cart: {},
    cartLength: 0,
    detail:{},
}

const reducer = (state = INIT_STATE, action) => {
    switch(action.type){
        case "GET_PRODUCTS":
            return {
                ...state, products: action.payload.data,
                paginatedPages: Math.ceil(action.payload.headers ["x-total-count"] / 3)
            }
        case "GET_EDIT_PRODUCT":
            return {...state, edit: action.payload}
        case "CHANGE_CART_COUNT":
            return {...state, cart: action.payload}
        case "GET_CART":
            return {...state, cart: action.payload}
        case "GET_DETAIL_PRODUCT":
            return {...state, detail: action.payload}
        default: return state   
    }
}

const ProductsContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    //! CREATE
    const addProduct = async(newProduct) =>{
        try {
            let res = await axios.post(API, newProduct)
            getProducts()
            return res
        } catch (error) {
            console.log(error);
        }
    }

    //! READ
    const getProducts = async ()=> {
        try {
            let res = await axios(`${API}${window.location.search}`)
            let action = {
                type: "GET_PRODUCTS",
                payload: res
            }
            dispatch(action)
        } catch (error) {
            console.log(error);
        }
    }


    //! UPDATE
    const editProduct = async(id) => {
       try {
            let res = await axios(`${API}/${id}`)
            let action ={
                type: "GET_EDIT_PRODUCT",
                payload:res.data
            }
        dispatch(action)
       } catch (error) {
        console.log(error);
       }
    }


    //! SAVE EDITED PRODUCT
    const saveEditedProduct = async (updatedProduct) => {
        try {
            await axios.patch(`${API}/${updatedProduct.id}`, updatedProduct)
        } catch (error) {
            console.log(error);
        }
    }


    //! DELETE
    const deleteProduct = async(id) => {
        await axios.delete(`${API}/${id}`)
        getProducts()
    }


    //! CART
    const addProductInCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }

        let newProduct = {
            item: product,
            count: 1,
            subPrice: 0
        }

        let filteredCart = cart.products.filter(elem => elem.item.id === product.id)
        if (filteredCart.length > 0){
            cart.products = cart.products.filter(elem => elem.item.id !== product.id)
        }else {
            cart.products.push(newProduct)
        }
        newProduct.subPrice = calcSubPrice(newProduct)
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: "CHANGE_CART_COUNT",
            payload: cart.products.length
        })
    }

    const getCartLength = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart){
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: "CHANGE_CART_COUNT",
            payload: cart.products.length
        })
    }

    const getCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart){
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: "GET_CART",
            payload: cart
        })
    }

    const changeProductCount = (count, id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.products = cart.products.map(elem => {
            if(elem.item.id == id){
                elem.count = count
                elem.subPrice = calcSubPrice(elem)
            }
            return elem
        })
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        getCart()
    }

    const checkProductInCart = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart){
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        let newCart = cart.products.filter(elem => elem.item.id === id)
        return newCart.length>0 ? true : false
    } 


    const getDetail = async(id) => {
        const res = await axios(`${API}/${id}`)
        let action = {
            type: "GET_DETAIL_PRODUCT",
            payload: res.data
        }
        dispatch(action)
    }

    //! SIGN IN / SIGN UP
    function signUp(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function signIn (email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout () {
        return signOut(auth)
    }


    function useAuth () {
        const [currentUser, setCurrentUser] = React.useState()

        React.useEffect(() => {
            const unsub = onAuthStateChanged(auth, user  =>
                setCurrentUser(user))
                return unsub
        }, [])
        
        return currentUser
    }


    return (
        <productContext.Provider value={{
            addProduct,
            getProducts,
            editProduct,
            saveEditedProduct,
            deleteProduct,
            addProductInCart,
            getCartLength,
            getCart,
            changeProductCount,
            checkProductInCart,
            getDetail,
            signUp,
            signIn,
            useAuth,
            logout,
            products: state.products,
            edit: state.edit,
            paginatedPages: state.paginatedPages,
            cart: state.cart,
            cartLength: state.cartLength,
            detail: state.detail
        }}>

            {children}
        </productContext.Provider>
    );
};

export default ProductsContextProvider;