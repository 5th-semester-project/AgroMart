import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prismadb';
import { redirect } from 'next/navigation';
import React from 'react'
import ToastCall from "@/components/toastCall"
import Chat from "@/components/chatBot"


export default async function BuyerPageLayout({children}) {

    const {userId} = auth();

    if(!userId){
        redirect("/sign-in")
    }

    const buyerExist = await prisma.buyer.findFirst({
        where:{
            userId
        }
    });


    if(buyerExist){
        redirect("/")
    }

    const sellerExist = await prisma.seller.findFirst({
        where:{
            sellerid:userId
        }
    });


    if(sellerExist){
            <ToastCall
                message ="You are not allowed to create buyer account.because you have already seller account."
            />
        
            redirect("/")
    }


  return (
    <>
        <Chat/>
      {children}
    </>
  )
}