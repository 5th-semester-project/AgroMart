'use client'

import { useState,useEffect } from "react";
import Sales from "./reportComponents/sales";
import Order from "./reportComponents/orders";
import Inventory from "./reportComponents/inventory";
import Delivery from "./reportComponents/deliveries";
import Customer from "./reportComponents/customers";

const Reports = () => {

    const [isMounted,setIsMounted] = useState(false);


    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted) {
        return (
            <div>Loading...</div>
        )
    }

    return ( 
        <div>
            <Sales/>
            <Order/>
            <Inventory/>
            <Delivery/>
            <Customer/>
        </div>
     );
}
 
export default Reports;