'use client'

import MessageBox from "./messageBox";

const MessageBody = ({currentCov,OtherUserName,receiverId }) => {



    return ( 
        <div>
            {currentCov && currentCov.messages.map((message, index) => (
                <MessageBox key={index} message={message} OtherUserName={OtherUserName} receiverId={receiverId} />
            ))}
        </div>
     );
}
 
export default MessageBody;