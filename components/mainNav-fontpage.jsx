"use client"

import * as React from "react"
import Link from "next/link"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import SmallCard from "./buyer-components/small-card"
import watchCart from "@/hooks/watchlistStore"
import useCart from "@/hooks/addtocardStore"
import { UserButton } from "@clerk/nextjs"
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation"



export function NavigationMenubar() {

  const { user} = useUser();
  const router = useRouter()
  
  const routeOrders = () => {
    router.push(`/orders/${user.id}`)
  }

  const routeCart = () => {
    router.push(`/cart/${user.id}`)
  }

  const wishlist = watchCart((state)=>state.items)
  const cartlist = useCart((state)=>state.items)



  const components= [
    {
      title: user ? "Login to Seller Account":"Create Seller Account",
      href: "/seller"
    },
    {
      title: user ? "Login to Buyer Account":"Create Buyer Account",
      href: "/buyer"
    },
    
  ]

  return (
    <NavigationMenu>
      <NavigationMenuList>

    {user &&  <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Messages</NavigationMenuTrigger>
          <NavigationMenuContent >
            <ScrollArea className="h-72 w-[300px] rounded-md">
              
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>}

        {user && <NavigationMenuItem>
          <NavigationMenuTrigger onClick={routeOrders} className="bg-transparent cursor-pointer">Orders</NavigationMenuTrigger>
        </NavigationMenuItem>  }


        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Watch List</NavigationMenuTrigger>
          <NavigationMenuContent >
            <ScrollArea className="h-72 w-[300px] rounded-md">
              {wishlist.map((item) => (
                <SmallCard key={item.id} product={item} type="watchlist"/>
              ))}

            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>


        <NavigationMenuItem>
          <NavigationMenuTrigger onClick={routeCart} className="bg-transparent cursor-pointer">Cart</NavigationMenuTrigger>
          <NavigationMenuContent >
            <ScrollArea className="h-72 w-[300px] rounded-md ">
              {cartlist.map((item) => (
                <SmallCard key={item.id} product={item} type ="cart"/>
              ))}

            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>




        <NavigationMenuItem >
          <NavigationMenuTrigger className="bg-transparent cursor-pointer">Account</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flx flex-col space-y-2 w-[200px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Notifications</NavigationMenuTrigger>
          <NavigationMenuContent >
            <ScrollArea className="h-72 w-[300px] rounded-md">
              {wishlist.map((item) => (
                <SmallCard key={item.id} product={item} type="watchlist"/>
              ))}

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
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
  
 
