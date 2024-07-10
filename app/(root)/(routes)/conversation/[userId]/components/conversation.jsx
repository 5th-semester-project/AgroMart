'use client'

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import BadgeAvatars from "./avatar";
import {  ChevronLeft, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";




const Conversation = ({convList}) => {

    const [open , setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    return ( 
        <div>
            <div className="flex w-full">
                <ScrollArea className={cn("h-[100vh] hidden md:flex md:w-96 rounded-md border bg-gray-200",
                    open ? "flex w-3/4": "hidden"
                )}>
                    <div className="p-5">
                        <div className="absolute w-full bg-gray-200">
                            <h4 className="mb-4 text-2xl font-bold leading-none flex">Chats (<p className="font-semibold text-xl">{convList.length}</p>)</h4>
                            <Separator className="bg-gray-400"/>
                        </div>
                        {convList.map((conv, index) => (
                            <div key={index} className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-300">
                                <BadgeAvatars/>
                                <div className="px-4 p-1">
                                    <h4 className="text-lg font-semibold leading-none">{conv.name}</h4>
                                    <p className="text-gray-500 text-xs">last seen at 4.00 pm</p>
                                </div>
                            </div>
                        ))}
                        {convList.length === 0 && (
                            <div className="flex items-center justify-center h-[100vh]">
                                <p className="text-gray-500">No chats available</p>
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <ScrollArea className="h-[100vh] w-full rounded-md border">
                    <div className="absolute w-full">
                        <div className="flex items-center justify-between">
                            <div className="p-3 px-4 flex">
                                <ChevronLeft className="flex md:hidden w-8 h-8 cursor-pointer text-gray-600 self-center mr-5"
                                    onClick={handleOpen}
                                />
                                <BadgeAvatars/>
                                <div className="px-4 p-1">
                                    <h4 className="text-lg font-semibold leading-none">Neranjan</h4>
                                    <p className="text-gray-500 text-xs">last seen at 4.00 pm</p>
                                </div>
                            </div>
                            <div className={cn("px-5",open ? "hidden" : "flex")}>
                                <MoreHorizontal className="cursor-pointer text-gray-600"/>
                            </div>
                        </div>
                        <Separator/>
                    </div>
                </ScrollArea>
            </div>
        </div>
     );
}
 
export default Conversation;