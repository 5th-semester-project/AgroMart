

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs";
  import SubCatProducts from "@/components/buyer-components/subCatList";
import getStore from "@/actions/get-store";
import getSeller from "@/actions/get-seller";
import BannerPreview from "@/components/banerPreview";
import getCategories from "@/actions/get-categories";

//ensure page fully reload
export const revalidate = 0;

const StorePage = async({params}) => {


    const store = await getStore(params.storeId)
    const categories = await getCategories(params.storeId)
    const seller = await getSeller(params.storeId)
    
    return ( 
        <div className="px-4">
            <h1 className="text-3xl font-bold py-4">{store?.name}</h1>
            <BannerPreview
                    disLabel={store?.disLabel}
                    imagUrl={store?.imageUrl}
                    facebook={seller?.facebook}
                    youtube={seller?.youtube}
                    instagram={seller?.instagram}
            />
            <Tabs defaultValue={categories[0].name} className="w-full py-10">
                <TabsList>
                    {categories.map((category) => (
                        <TabsTrigger value={category.name} key={category.id}>
                            {category.name}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {categories.map((category) => (
                    <TabsContent key={category.id} value={category.name}>
                        <SubCatProducts plist={category.products} />
                    </TabsContent>
                ))}
          </Tabs>
        </div>
     );
}
 
export default StorePage;