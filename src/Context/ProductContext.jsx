/* eslint-disable react/prop-types */
import  { createContext, useState } from 'react'

export const ProductContext = createContext()
const ProductContextFun = (props) => {
    // eslint-disable-next-line no-unused-vars
    const [product1, setProduct1] = useState('laptop')

    return (
        <ProductContext.Provider value={product1}>
            {props.children}
        </ProductContext.Provider>)
}



export default ProductContextFun