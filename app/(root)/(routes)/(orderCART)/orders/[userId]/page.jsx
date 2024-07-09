
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs";
  import SubCatProducts from "@/components/buyer-components/subCatList";
import OrderItem from "./components/orderItem";


  export const revalidate = 0;

const OrderPage = () => {
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
                        {/* <SubCatProducts plist={category.products} /> */}
                    <OrderItem/>
                    </TabsContent>
                    <TabsContent value="Shipped">
                        {/* <SubCatProducts plist={category.products} /> */}
                        shipped
                    </TabsContent>
                    <TabsContent value="Completed">
                        {/* <SubCatProducts plist={category.products} /> */}
                        completed
                    </TabsContent>
            
          </Tabs>
        </div>
     );
}
 
export default OrderPage;