import { NavigationMenuDemo } from "@/components/mainNav-fontpage";


const ProductLayout = ({children}) => {
    return ( 
        <>
        <div className="px-4 flex justify-between items-center">
            <h1>Logo</h1>
            <NavigationMenuDemo/>
        </div>
        {children}
        </>
     );
}
 
export default ProductLayout;