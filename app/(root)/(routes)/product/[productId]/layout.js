import { NavigationMenubar } from "@/components/mainNav-fontpage";
import Link from 'next/link';


const ProductLayout = ({children}) => {
    return ( 
        <>
        <div className="flex justify-between items-center w-full  bg-gray-200">
            <div>
                <Link href="/">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-20 h-13 cursor-pointer" 
                />
                </Link>

            </div>
            <NavigationMenubar/>
        </div>
        {children}
        </>
     );
}
 
export default ProductLayout;