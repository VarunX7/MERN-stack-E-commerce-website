import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

  const [image, setImage] = useState(false)
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  })
  
  const imageHandler = (e)=>{
    setImage(e.target.files[0])
  }

  const changeHandler = (e)=>{
    setProductDetails({...productDetails, [e.target.name]:e.target.value})
  }

  const saveProduct = async ()=>{
    let responseData 
    let product = productDetails
    
    let formData = new FormData()
    formData.append('product', image)

    await fetch('http://localhost:4000/upload',{
      method: 'POST',
      headers:{
        Accept: 'application/json',
      },
      body: formData,
    }).then((res)=>res.json()).then((data)=>{responseData=data})

    if(responseData.success){
      product.image = responseData.image_url
      await fetch('http://localhost:4000/addproduct',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
      }).then((res)=>res.json()).then((data)=>{data.success ? alert("product added successfuly") : alert("Failed!")})
    }
  }

  return (
    <div className='addProduct'>
      <div className="addProduct-item-fields">
        <p>Product title</p>
        <input type="text" name="name" placeholder='type here' value={productDetails.name} onChange={changeHandler} />
      </div>
      <div className="addProduct-price">
        <div className="addProduct-item-fields">
          <p>Price</p>
          <input type="text" name="old_price" placeholder='type here' value={productDetails.old_price} onChange={changeHandler} />
        </div>
        <div className="addProduct-item-fields">
          <p>Offer Price</p>
          <input type="text" name="new_price" placeholder='type here' value={productDetails.new_price} onChange={changeHandler} />
        </div>
      </div>
      <div className="addProduct-item-fields">
        <p>Product Category</p>
        <select name="category" className='addProduct-selector' value={productDetails.category} onChange={changeHandler}>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="Kids">Kids</option>
        </select>
      </div>
      <div className="addProduct-item-fields">
        <label htmlFor="file-input">
          <img className='addProduct-thumbnail' src={image ? URL.createObjectURL(image) : upload_area} alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
      </div>
      <button className='addProduct-btn' onClick={()=>{saveProduct()}}>ADD</button>
    </div>
  )
}

export default AddProduct