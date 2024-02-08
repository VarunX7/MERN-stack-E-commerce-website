import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext'
import remove_icon from '../assets/cart_cross_icon.png'

export const CartItems = () => {

  const { all_product, cartItems, removeFromCart, getTotalAmount } = useContext(ShopContext)
  return (
    <div className='cartItems'>
      <div className="cartItems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e, i) => {
        if (cartItems[e.id] > 0) {
          return <div key={i}>
            <div className="cartItems-format cartItems-format-main">
              <img src={e.image} alt="" className='carticon-product-icon' />
              <p>{e.name}</p>
              <p>${e.new_price}</p>
              <button className='cartItems-quantity'>{cartItems[e.id]}</button>
              <p>${e.new_price*cartItems[e.id]}</p>
              <img className='cartItems-remove-icon' src={remove_icon} alt="" onClick={() => { removeFromCart(e.id) }} />
            </div>
            <hr />
          </div>
        }
        return null
      })}
      <div className="cartItems-down">
        <div className="cartItems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartItems-total-item">
              <p>Subtotal</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cartItems-total-item">
              <p>Shipping fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartItems-total-item">
              <h3>Total</h3>
              <h3>${getTotalAmount()}</h3>
            </div>  
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartItems-promocode">
          <p>If you have a promocode, Enter it here</p>
          <div className="cartItems-promobox">
            <input type="text" placeholder="promocode" id="" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}
