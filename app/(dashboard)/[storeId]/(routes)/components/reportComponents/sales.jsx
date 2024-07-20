'use client'

import { useState,useEffect } from "react";

const Sales = () => {

    const [isMounted,setIsMounted] = useState(false);


    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted) {
        return null
    }

    return ( 
        <div>
            {/* 1. Sales Reports
            Date Range: Last 7 days, Last 30 days, This month, Last month, Custom range
            Product Category: All categories, Specific category
            Product: All products, Specific product
            Region: All regions, Specific region
            Payment Method: All methods, Credit Card, PayPal, etc.
            Customer Type: All customers, New customers, Returning customers */}
        </div>
     );
}
 
export default Sales;