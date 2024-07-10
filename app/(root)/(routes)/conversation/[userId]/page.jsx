import prismadb from "@/lib/prismadb";
import Conversation from "./components/conversation";


const ConversationPage = async({params}) => {

    const userId = params.userId;


    const convList = await prismadb.conversation.findMany({
        where:{
            userIds:{
                has:userId
            }
        }
    })

    

    return ( 
        <>
            <Conversation
                convList={convList}
            />
        </>
     );
}
 
export default ConversationPage;