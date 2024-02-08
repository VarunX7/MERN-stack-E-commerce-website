import React, { useContext, useEffect, useState } from 'react'
import './Popular.css'
import { Item } from '../item/Item'
import { ShopContext } from '../../context/ShopContext'

export const Popular = () => {

  const { all_product } = useContext(ShopContext)
  const [popular, setPopular] = useState([])

  useEffect(() => {
    const womenItems = all_product.filter(item => item.category === 'women').slice(0, 4);
    setPopular(womenItems);
  }, [all_product])

  return (
    <div className='popular'>
      <h1>Popular In Women</h1>
      <hr />
      <div className="popular-item">
        {popular.map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}
