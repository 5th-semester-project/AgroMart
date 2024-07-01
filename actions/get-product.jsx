

const getProduct = async(id) => {
    
    const URL = process.env.DOMAIN_URL;

    
    const product = await fetch(`${URL}/api/buyer/getProduct/${id}`)
    
    return product.json();
}
 
export default getProduct;