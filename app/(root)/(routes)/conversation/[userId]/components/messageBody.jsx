'use client'

import React from "react";
import MessageBox from "./messageBox";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { format, isSameDay } from "date-fns";

const MessageBody = ({currentCov,OtherUserName,receiverId }) => {

    const {userId} = useParams();

    useEffect(() => {
        axios.patch(`/api/conversation/${userId}/seen`,{
            conversationId: currentCov.id
        })
    },[currentCov.id]);


    const renderMessages = () => {
        let lastMessageDate = null;

        return currentCov.messages.map((message, index) => {
            const messageDate = new Date(message.createdAt);
            const shouldShowDateSeparator = !lastMessageDate || !isSameDay(lastMessageDate, messageDate);
            lastMessageDate = messageDate;

            return (
                <React.Fragment key={index}>
                    {shouldShowDateSeparator && (
                        <div className="text-muted-foreground font-semibold flex w-full justify-center my-5 text-sm">
                            {format(messageDate, 'MMMM d, yyyy')}
                        </div>
                    )}
                    <MessageBox message={message} OtherUserName={OtherUserName} receiverId={receiverId} />
                </React.Fragment>
            );
        });
    };

    return (
        <div>
            {currentCov && renderMessages()}
        </div>
    );
};
export default MessageBody;