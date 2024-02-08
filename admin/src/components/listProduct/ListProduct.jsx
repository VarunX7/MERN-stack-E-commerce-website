import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import crossIcon from '../../assets/cross_icon.png'

const ListProduct = () => {

    const [allProducts, setAllProducts] = useState([])

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts').then((res) => res.json()).then((data) => { setAllProducts(data) })
    }

    const removeProduct = async(id)=>{
        await fetch('http://localhost:4000/removeproduct', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        })
        fetchInfo()
    }

    useEffect(() => {
        fetchInfo()
    }, [])

    return (
        <div className='listProducts'>
            <h1>All Products list</h1>
            <div className="listProducts-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listProducts-all">
                <hr />
                {allProducts.map((product, i) => {
                    return <>
                        <div key={i} className="listProducts-format-main listProducts-format">
                            <img src={product.image} alt="" className='listProducts-product-icon' />
                            <p>{product.name}</p>
                            <p>${product.old_price}</p>
                            <p>${product.new_price}</p>
                            <p>{product.category}</p>
                            <img className="listProducts-remove-icon" src={crossIcon} alt="" onClick={()=>{removeProduct(product.id)}}/>
                        </div>
                        <hr />
                    </>
                })}
            </div>
        </div>
    )
}

export default ListProduct