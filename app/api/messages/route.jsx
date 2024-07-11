import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req){
    try {

        const {userId} = auth();

        const body = await req.json();

        const {message,image,conversationId,receiverId} = body;

        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!receiverId || !conversationId){
            return new NextResponse("receiverId and conversationId are required", { status: 400 });
        }

        const messageData = await prismadb.Message.create({
            data:{
                senderId: userId,
                receiverId,
                body: message,   
                image ,
                conversationId 
            }
        });

        return new NextResponse(messageData);
        
    } catch (error) {
        console.log("error in the POST request of message", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}