'use client'


import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";


const MainNavbar = ({className,...props}) => {

    const pathname = usePathname();

    const params = useParams();
    

    const routes = [
        {
            href:`/${params.storeId}`,
            label:"Overview",
            active: pathname === `/${params.storeId}`
        },
        {
            href:`/${params.storeId}/categories`,
            label:"Categories",
            active: pathname === `/${params.storeId}/categories`
        },
        {
            href:`/${params.storeId}/products`,
            label:"Products",
            active: pathname === `/${params.storeId}/products`
        },
        {
            href:`/${params.storeId}/orders`,
            label:"Orders",
            active: pathname === `/${params.storeId}/orders`
        },
        {
            href:`/${params.storeId}/messages`,
            label:"Messages",
            active: pathname === `/${params.storeId}/messages`
        },
        {
            href:`/${params.storeId}/settings`,
            label:"Settings",
            active: pathname === `/${params.storeId}/settings`
        },


    ]
    return ( 
        <nav
            className={cn("flex items-center space-x-4",className)}
        >
            
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active ? "text-black dark:text-white" : "text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
            ))}

        </nav>
     );
}
 
export default MainNavbar;