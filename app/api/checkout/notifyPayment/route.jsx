import prismadb from "@/lib/prismadb";
import axios from "axios";
import { NextResponse } from "next/server";
import { createHash } from 'node:crypto';


export async function POST(req){
    try {

        const { 
            merchant_id, 
            order_id, 
            payhere_amount, 
            payhere_currency, 
            status_code, 
            md5sig 
        } = req.body;

        const local_md5sig = createHash('md5').update(
            merchant_id + order_id + payhere_amount + payhere_currency + status_code + crypto.createHash('md5').update(process.env.MERCHANT_SECRET).digest('hex')
          ).digest('hex').toUpperCase();

          if (local_md5sig === md5sig && status_code == 2){

              await prismadb.order.update({
                where:{
                    payId :order_id
                },
                  data:{
                      status:"SUCCESS"
                  }
              })

              console.log("Payment status updated in notify api")
              return NextResponse.json({ message: 'Payment status updated' })
          }else {
            return new NextResponse("error inside the notify api",{status:400})
          }
    } catch (error) {
        console.log("error inside the notify",error)
        return new NextResponse("error in the post notify payment",{status:500})
    }
}