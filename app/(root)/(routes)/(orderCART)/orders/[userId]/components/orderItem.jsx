'use client'

import { useState } from "react";
import DelivaryDetails from "./info";
import VerticalLinearStepper from "./shippingInfo";
import toast from "react-hot-toast";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import CustomButton from "@/components/ui/custom-button";
  import { MessageCirclePlus } from "lucide-react";
  import Rating from '@mui/material/Rating';
  import Box from '@mui/material/Box';
  import { Star } from "lucide-react";
  import { Textarea } from "@/components/ui/textarea"
  import {Label} from "@/components/ui/label"
  import { formatter } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { CommandLoading } from "cmdk";

  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }


  
 function OrderItem({data}) {

    const[loading,setLoading] = useState(false);

    const {user} = useUser();
    const router = useRouter();

    const [value, setValue] = useState(0);
    const [hover, setHover] = useState(-1);

    const copyToClipboard = (id) => {
        navigator.clipboard.writeText(id)
        toast.success("Copied the to clipboard")
    }


    

    const CreateConversation = async () => {
        setLoading(true);
        try {
          const res = await axios.post("/api/conversation/create", { storeId: data.storeId });
          router.push(`/conversation/${user.id}/${res.data.id}`);
        } catch (error) {
          console.error("Failed to create conversation:", error);
        } finally {
          setLoading(false);
        }
      };
      

    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex w-full justify-between px-10">
                <div className="flex gap-20">
                    <div>
                        <img src={data.image} alt="product" className="w-20 h-20 rounded-md" />
                    </div>
                    <div className="flex font-semibold gap-3">
                        <p>{data.name}</p>
                        <Separator orientation="vertical" className="h-[20px]"/>
                        <p className="font-light"> {data.category}</p>
                    </div>
                </div>
                <div className="sm:flex hidden gap-10 font-semibold">
                    <div className="sm:flex hidden font-semibold">
                        <h2>Order State <p className="font-light p-1 rounded-xl bg-green-300">{data.status}</p> </h2>
                    </div>
                    <h2>Order Date <p className="font-light">{data.createdAt}</p> </h2>
                </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="sm:grid sm:grid-cols-3 gap-10 flex flex-col w-full" >
                <div>
                    <DelivaryDetails
                        buyer={{
                            name: data.buyer.name,
                            phoneNum: data.buyer.phoneNum,
                            address: data.buyer.address,
                            area: data.buyer.area,
                            district: data.buyer.district,
                            province: data.buyer.province,
                        }}
                    />
                    <div>
                        <h2 className="flex gap-4 p-2 px-4 font-semibold">
                            Order Id : <h3 className="font-light">{data.orderId}</h3> 
                            <p 
                                className="text-blue-600 font-semibold text-xs cursor-pointer hover:text-blue-800" 
                                onClick={()=>copyToClipboard(data.orderId)}
                                >
                                    copy
                            </p> 
                        </h2>
                    </div>
                    <h2 className="flex gap-4 p-2 px-4 font-semibold">
                            Order Amount : <h3 className="font-light">{formatter.format(data.price)}</h3> 
                    </h2>
                    <h2 className="flex gap-4 p-2 px-4 font-semibold">
                            Order Completed on : <h3 className="font-light">15/08/2024</h3> 
                    </h2>
                    <h2 className="flex gap-4 p-2 px-4 font-semibold">
                            Payment Method : <h3 className="font-light">Credit/Debit Card</h3> 
                    </h2>
                    <div className="p-2 px-4">
                        <CustomButton
                            onClick={CreateConversation}
                            icon={<MessageCirclePlus size={20} className="text-gray-600"/>}
                            name="Contact seller"
                            variant="outline"
                            className="bg-gray-50 hover:bg-gray-100"
                            disabled={loading}
                        />
                    </div>
            

                </div>
                <VerticalLinearStepper/>
                <div>
                    <h1 className="font-bold text-lg">
                        Review
                    </h1>
                    <div className="mt-4 ml-4">
                        <Box
                            sx={{
                                width: 200,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            >
                            <Rating
                                name="hover-feedback"
                                value={value}
                                precision={0.5}
                                getLabelText={getLabelText}
                                onChange={(event, newValue) => {
                                setValue(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                setHover(newHover);
                                }}
                                emptyIcon={<Star style={{ opacity: 0.55 }}  />}
                            />
                            {value !== null && (
                                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                            )}
                        </Box>
                        <div className="grid w-full gap-1.5 pr-5 mt-5">
                            <Label htmlFor="message">Give a review</Label>
                            <Textarea placeholder="Type your message here." id="message" />
                            <Button className="cursor-pointer">
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  
  export default OrderItem;
