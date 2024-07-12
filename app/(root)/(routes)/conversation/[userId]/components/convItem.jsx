'use client'


import { useRouter } from "next/navigation";
import BadgeAvatars from "./avatar";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { format } from "date-fns";


const ConvItem =({conversation,currentCovId}) => {

    

    const router = useRouter();
    const {user} = useUser();
  
    console.log("conversation",conversation)
    const getLastMessage = useMemo(() => {
        // return conversation.messages[conversation.messages.length - 1].body;
    })

    const handleRouting =()=>{
        router.push(`/conversation/${user.id}/${conversation.id}`)
    }


    return ( 
        <div className={cn("flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-300",(conversation.id === currentCovId ) && "bg-gray-300")} onClick= {handleRouting}>
            <BadgeAvatars user ={conversation.users[0].name}/>
            <div className="px-2 p-1 w-full">
                <div className="flex justify-between items-center w-full">
                    <h4 className="text-lg font-semibold leading-none overflow-hidden text-ellipsis whitespace-nowrap">{conversation.users[0].name.split(' ')[0]}</h4>
                    <p className="text-gray-500 text-xs leading-none overflow-hidden text-ellipsis whitespace-nowrap">{ format(new Date(conversation.lastMessageAt), 'h:mm a')}</p>
                </div>
                <div className="flex mt-1 justify-between items-center w-full">
                    <p className="text-gray-500 text-xs leading-none overflow-hidden text-ellipsis whitespace-nowrap">{getLastMessage}</p>
                    <span className="text-xs  p-1 bg-green-600 rounded-full font-semibold">12</span>
                </div>
            </div>
        </div>
     );
}
 
export default ConvItem;