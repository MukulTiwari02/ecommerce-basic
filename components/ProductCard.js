import React, { useContext } from 'react'
import { ProductsContext } from './ProductsContext'

const ProductCard = ({product}) => {

    const {setSelectedProducts} = useContext(ProductsContext);

    function addItem()
    {
      setSelectedProducts(products => [...products, product._id]);
    }
  return (
    <div className="py-4 snap-start">
        <div className="w-64 snap-start">
            <div className="bg-blue-100 p-5 rounded-xl">
            <img src={product.picture} alt="" />
            </div>
            <div className="mt-2">
            <h3 className="font-bold text-lg">{product.name}</h3>
            </div>
            <p className="text-sm mt-1 leading-4">{product.description}</p>
            <div className="flex mt-1">
            <div className="text-2xl font-bold grow">${product.price}</div>
            <button className="bg-emerald-400 py-1 px-3 text-white rounded-xl" onClick={addItem}>+</button>
            </div>
        </div>
    </div>
  )
}

export default ProductCard