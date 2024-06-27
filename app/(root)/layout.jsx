
import { auth } from '@clerk/nextjs/server'
import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function SetupPageLayout({children}) {
    const {userId} = auth();

    if(!userId){
        redirect("/sign-in")
    }

    const store = await prismadb.store.findFirst({
        where:{
            ownerId:userId
        }
    });

    if(store){
        redirect(`/${store.id}`)
    }


  return (
    <>
      {children}
    </>
  )
}