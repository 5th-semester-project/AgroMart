import { auth } from '@clerk/nextjs/server'
import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';
import React from 'react'
import ToastCall from "@/components/toastCall"


export default async function BuyerPageLayout({children}) {

    const {userId} = auth();

    if(!userId){
        redirect("/sign-in")
    }

    const buyerExist = await prismadb.buyer.findUnique({
        where:{
            userId
        }
    });


    if(buyerExist){
        redirect("/")
    }

    const sellerExist = await prismadb.seller.findUnique({
        where:{
            id:userId
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
      {children}
    </>
  )
}