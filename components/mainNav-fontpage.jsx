"use client"

import  React ,{useState,useEffect}from "react"
import { Badge } from "@/components/ui/badge"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import SmallCard from "./buyer-components/small-card"
import watchCart from "@/hooks/watchlistStore"
import useCart from "@/hooks/addtocardStore"
import notificationStore from "@/hooks/notificationStore"
import { pusherClient } from "@/lib/pusher"
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs"
import { useAuth } from "@clerk/clerk-react";
import { useRouter } from "next/navigation"
import {Trash ,CircleChevronDown } from 'lucide-react';
import toast from "react-hot-toast"
import payCart from "@/hooks/addtoPayCart"


export function NavigationMenubar() {

  const pathname = usePathname();
  const [isMounted,setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  },[])

  
  const { userId } = useAuth();
  const router = useRouter()
  
  const addItem = notificationStore((state) => state.addItem);
    
  const wishlist = watchCart((state) => state.items)
  const cartlist = useCart((state) => state.items)
  const notifications =  notificationStore((state) => state.items)
  const {removeAll} = notificationStore();
  const {removeAllWatch} = watchCart();
  const {removeAllCart} = useCart();
  const {removeAllToPay} = payCart();

  useEffect(() => {
    pusherClient.subscribe("1");

    const notifyHandler = (message) => {
      addItem(message);
      if(message.status === "SUCCESS"){
        removeAllToPay();
      }else{
        toast.error("Your order is not successful.")
      }
    };

    pusherClient.bind("payment:new", notifyHandler);

    return () => {
      pusherClient.unsubscribe("1");
      pusherClient.unbind("payment:new", notifyHandler);
    }; 
  }, [addItem]);

 

  const routeOrders = () => {
    router.push(`/orders/${userId}`)
  }
  
  const routeCart = () => {
    router.push(`/cart/${userId}`)
  }
  
  const routeConversation = () => {
    router.push(`/conversation/${userId}`)
  }


  
  
  const components = [
    {
      title: userId ? "Login to Seller Account" : "Create Seller Account",
      href: "/seller"
    },
    {
      title: userId ? "Login to Buyer Account" : "Create Buyer Account",
      href: "/buyer"
    },
  ]
  
  if(!isMounted) return null
  
  console.log("notification",notifications)

  return (
    <NavigationMenu className="">
      <NavigationMenuList>

        {userId && <NavigationMenuItem className={cn("bg-transparent hover:bg-gray-400 rounded-2xl relative",pathname.startsWith("/conversation")&& "bg-gray-400" )} >
          <Badge className=" absolute right-0 bg-green-500 hover:bg-green-300 cursor-pointer">5</Badge>
          <NavigationMenuTrigger className="bg-transparent" onClick={routeConversation} >Messages</NavigationMenuTrigger>
        </NavigationMenuItem>}

        {userId && <NavigationMenuItem className={cn("bg-transparent hover:bg-gray-400 rounded-2xl relative",pathname.startsWith("/orders" )&& "bg-gray-400" )} >
          <NavigationMenuTrigger onClick={routeOrders} className="bg-transparent cursor-pointer">Orders</NavigationMenuTrigger>
        </NavigationMenuItem>}

        <NavigationMenuItem className="bg-transparent hover:bg-gray-400 rounded-2xl relative" >
          <Badge className=" absolute right-0 bg-green-500 hover:bg-green-300 cursor-pointer">{wishlist.length}</Badge>
          <NavigationMenuTrigger className="bg-transparent">Watch List</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ScrollArea className="h-72 w-[300px] rounded-md bg-gray-200">
            <div className="flex justify-between px-4">
                <CircleChevronDown className="m-2" />
                <div className="flex items-center cursor-pointer font-medium" onClick={removeAllWatch} >
                  <h4>
                    Clear
                  </h4>
                <Trash className="m-2 cursor-pointer text-red-600 p-1 bg-rose-300 rounded-xl" />
                </div>
              </div>
              {wishlist.map((item) => (
                <SmallCard key={item.id} product={item} type="watchlist" />
              ))}
              {wishlist.length === 0 && <div className="text-center text-gray-500 my-10" >No items in the watchlist</div>}
              <div className="my-5"/>
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {userId && <NavigationMenuItem className={cn("bg-transparent hover:bg-gray-400 rounded-2xl relative",pathname.startsWith("/cart" )&& "bg-gray-400" )} >
          <Badge className=" absolute right-0 bg-green-500 hover:bg-green-300 cursor-pointer">{cartlist.length}</Badge>
          <NavigationMenuTrigger onClick={routeCart} className="bg-transparent cursor-pointer">Cart</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ScrollArea className="h-72 w-[300px] rounded-md bg-gray-200">
            <div className="flex justify-between px-4">
                <CircleChevronDown className="m-2" />
                <div className="flex items-center cursor-pointer font-medium" onClick={removeAllCart} >
                  <h4>
                    Clear
                  </h4>
                <Trash className="m-2 cursor-pointer text-red-600 p-1 bg-rose-300 rounded-xl" />
                </div>
              </div>
              {cartlist.map((item) => (
                <SmallCard key={item.id} product={item} type="cart" />
              ))}
              {cartlist.length === 0 && <div className="text-center text-gray-500 my-10" >No items in the cart</div>}
              <div className="my-5"/>
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>}

        <NavigationMenuItem className="bg-transparent hover:bg-gray-400 rounded-2xl relative" >
          <NavigationMenuTrigger className="bg-transparent cursor-pointer">Account</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col space-y-2 w-[200px] bg-gray-200">
              {components.map((component) => (
                <div key={`${component.title}-${component.href}`} className="flex justify-between items-center px-2 hover:bg-gray-300">
                  <ListItem
                    title={component.title}
                    href={component.href}
                  />
                </div>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="bg-transparent hover:bg-gray-400 rounded-2xl relative" >
          <Badge variant="destructive" className=" absolute right-0 hover:bg-red-400 cursor-pointer">{notifications.length}</Badge>
          <NavigationMenuTrigger className="bg-transparent">Notifications</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ScrollArea className="h-72 w-[300px] rounded-md bg-gray-200">
              <div className="flex justify-between px-4">
                <CircleChevronDown className="m-2" />
                <div className="flex items-center cursor-pointer font-medium" onClick={removeAll} >
                  <h4 >
                    Clear
                  </h4>
                  <Trash className="m-2 cursor-pointer text-red-600 p-1 bg-rose-300 rounded-xl" />
                </div>
              </div>
              {notifications.map((item) => (
                <SmallCard key={item.id} product={item} type="notification" />
              ))}
              {notifications.length === 0 && <div className="text-center text-gray-500 my-10" >No notifications</div>}
              <div className="my-5"/>
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <UserButton afterSignOutUrl="/" />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
