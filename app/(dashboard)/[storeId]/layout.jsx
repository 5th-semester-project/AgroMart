
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import NavBar from "@/components/navbar";

const DashBoardLayout= async({children,params}) =>{
    const {userId} = auth();

    if(!userId){
        redirect("/sign-in")
    }
    
    const store = await prismadb.Store.findFirst({
        where:{
            id: params.storeId,
            ownerId:userId
        }
    });

    if(!store){
        redirect("/")
    }

    return (
        <>
            <NavBar/>
            {children}
        </>
    )
}

export default DashBoardLayout;