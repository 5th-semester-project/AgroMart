
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, { params }){

  console.log("params.productId inside the GET",params.productId);

  try {
    const product = await prismadb.product.findUnique({
      where: {
        id:params.productId
      },
      include:{
        category:true
      }
    });


    console.log("productinside the GET",product);

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product", error);
    return new NextResponse("Error fetching product", { status: 500 });
  }
};


