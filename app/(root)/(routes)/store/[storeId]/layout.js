import { NavigationMenuDemo } from "@/components/mainNav-fontpage";


const StorePageLayout = ({children}) => {
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
 
export default StorePageLayout;