import prismadb from "@/lib/prismadb";
import Conversation from "../components/conversation";


const ConversationPage = async({params}) => {

    const {userId,conversationId} = params;


    const convList = await prismadb.conversation.findMany({
        where:{
            userIds:{
                has:userId
            }
        },
        orderBy:{
            lastMessageAt:'desc'
        }
    })

    const currentConversation = await prismadb.conversation.findUnique({
        where:{
            id:conversationId
        },
        include:{
            messages:true
        }
    })



    const formattedConversations = await Promise.all(convList.map(async (conversation) => {
        const buyers = await prismadb.buyer.findMany({
            where: {
                userId: {
                    in: conversation.userIds,
                    not: userId
                }
            },
            select: {
                userId: true,
                name: true,
                email: true,
                // Include other fields you need
            }
        });

        const sellers = await prismadb.seller.findMany({
            where: {
                sellerid: {
                    in: conversation.userIds,
                    not: userId
                }
            },
            select: {
                sellerid: true,
                name: true,
                email: true,
                // Include other fields you need
            }
        });

        // Combine buyers and sellers into a single users array
        const users = [...buyers, ...sellers];

        return {
            ...conversation,
            users
        };
    }));



    return ( 
        <>
            <Conversation
                convList={formattedConversations}
                isDisplayMessages={true}
                currentConversation={currentConversation}
                Select={true}
            />
        </>
     );
}
 
export default ConversationPage;