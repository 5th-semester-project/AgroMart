
import prismadb from "@/lib/prismadb";
import { NavigationMenubar } from "@/components/mainNav-fontpage";
import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';

const cartLayout = async({children}) => {

    const {userId} = auth();

 console.log("userId in the layout: ", userId)
    if(!userId){
        redirect("/sign-in")
    }

    const buyerExist = await prismadb.buyer.findFirst({
      where:{
          userId
      }
    });

    if(!buyerExist){
        redirect("/sign-in")
    }

    return (
        <>
         <div className="px-4 flex justify-between items-center">
            <h1>Logo</h1>
            <NavigationMenubar/>
        </div>
            {children}
        </>
      );
}
 
export default cartLayout;