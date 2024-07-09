
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs";
import OrderItem from "./components/orderItem";
import prismadb from "@/lib/prismadb";
import {format} from "date-fns";

export const revalidate = 0;

const OrderPage = async({params}) => {

    const orders = await prismadb.order.findMany({
            where:{
                buyerId: params.userId,
                status:'SUCCESS'
            },
            include:{
                buyer:true,
                products:{
                    include:{
                        category:true,
                    }
                }
            },
            orderBy:
            {
                createdAt: 'desc'
            }
    })

    
    const mappedOrders = orders.flatMap(order =>
        order.products.map(product => ({
          image: product.imageUrls[0].url,
          name: product.name,
          status: order.status,
          category: product.category.name,
          price: product.price - (product.discount / 100 * product.price),
          orderId: order.payId,
          createdAt:format(order.createdAt,"MMMM do,yyyy"),
          buyer: order.buyer,
        }))
      );
    return ( 
        <div className="px-4">
            <h1 className="font-bold text-xl mt-3">Orders Info</h1>
            <Tabs defaultValue="Processing" className="w-full py-10">
                <TabsList>
                    <TabsTrigger value="Processing">
                        Processing ({5})
                    </TabsTrigger>
                    <TabsTrigger value="Shipped">
                        Shipped ({5})
                    </TabsTrigger>
                    <TabsTrigger value="Completed">
                        Completed ({5})
                    </TabsTrigger>
                </TabsList>
                    <TabsContent value="Processing">
                        {mappedOrders.map((order) => (
                            <OrderItem key={order.orderId} data={order} />
                        ))}
                    </TabsContent>
                    <TabsContent value="Shipped">
                        shipped
                    </TabsContent>
                    <TabsContent value="Completed">
                        completed
                    </TabsContent>
            
          </Tabs>
        </div>
     );
}
 
export default OrderPage;