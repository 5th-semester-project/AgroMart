

const getTopDiscountedProducts = async() => {

    const url = process.env.DOMAIN_URL
    const products = await fetch(`${url}/api/seller/getTopDiscounted`);
    return products.json();

}
 
export default getTopDiscountedProducts;