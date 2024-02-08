import React, { useEffect, useState } from 'react'
import './NewCollections.css'
// import new_collections from '../assets/new_collections'
import { Item } from '../item/Item'

export const NewCollections = () => {

  const [newCollection, setNewCollection] = useState([])
  
  useEffect(()=>{
    fetch('http://localhost:4000/allproducts')
    .then((res)=>res.json())
    .then((data)=>{data.length>8 ? setNewCollection(data.slice(-8)) : setNewCollection(data)})
  },[])

  return (
    <div className='newCollections'>
        <h1>New collections</h1>
        <hr />
        <div className="collections">
            {newCollection.map((item, i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}
