//;

import {create} from 'zustand';
import {persist,createJSONStorage} from "zustand/middleware";

const notificationStore = create(

    persist((set,get)=>({
        items:[],
        addItem:(data)=>{
            const currentItems = get().items;
            const existingItem = currentItems.find((item)=>item.id === data.id);

            if(existingItem){
                return 
            }

            set({items:[data, ...get().items]})

        },
        removeItem:(id)=>{
            set({items:[...get().items.filter((item)=>item.id !== id)]})
        },
        removeAll:()=>{
            set({items:[]})
           
        }

    }),{
        name:"notification-storage",
        storage:createJSONStorage(()=>localStorage)
    })
)

export default notificationStore;