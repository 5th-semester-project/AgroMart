import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req){
    try {

        const {userId} = auth();

        const body = await req.json();
        const { storeId } = body;

        if(!storeId || !userId){
            return new NextResponse("storeId or userId is missing",{status:400})
        }

        const seller = await prismadb.seller.findFirst({
            where:{
                storeId
            }
        })

        if(!seller){
            return new NextResponse("seller not found",{status:404})
        }

        const convExist = await prismadb.conversation.findFirst({
            where:{
                userIds:{
                    hasEvery:[userId,seller.sellerid]
                }
            }
        })

        if(convExist){
            return NextResponse.json(convExist);
        }

        const conversation = await prismadb.conversation.create({
            data:{
                userIds:[userId,sellerId]
            }
        }) 

        
        return NextResponse.json(conversation);
        
    } catch (error) {
        console.log("error in the create the conversation",error)
        return new NextResponse("error in the create the conversation",{status:500})
    }
}