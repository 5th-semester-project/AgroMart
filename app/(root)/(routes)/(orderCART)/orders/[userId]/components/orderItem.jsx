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


  
 function OrderItem() {

    const [value, setValue] = useState(0);
    const [hover, setHover] = useState(-1);

    const copyToClipboard = (id) => {
        navigator.clipboard.writeText(id)
        toast.success("Copied the to clipboard")
    }


    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex justify-between w-full px-10">
                <div>
                    image
                </div>
                <div className="sm:flex gap-5 hidden font-semibold">
                    <p>name |</p>
                    <p>Category</p>
                </div>
                <div className="sm:flex sm:justify-between gap-5 hidden font-semibold">
                    <p>Order Date: 12/12/2021</p>
                </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-10" >
                <div>
                    <DelivaryDetails
                        buyer={{
                            name: 'John Doe',
                            phoneNum: '0123456789',
                            address: '123 Main St',
                            area: 'Area',
                            district: 'District',
                            province: 'Province',
                        }}
                    />
                    <div>
                        <h2 className="flex gap-4 p-2 px-4 font-semibold">
                            OrderId : <h3 className="font-light">b8cddd44-ce1c-4e21-8595-ea23599f0787</h3> 
                            <p 
                                className="text-blue-600 font-semibold text-xs cursor-pointer hover:text-blue-800" 
                                onClick={()=>copyToClipboard("ygdyfgvf")}
                                >
                                    copy
                            </p> 
                        </h2>
                    </div>
                    <h2 className="flex gap-4 p-2 px-4 font-semibold">
                            Order Amount : <h3 className="font-light">$50.50</h3> 
                    </h2>
                    <h2 className="flex gap-4 p-2 px-4 font-semibold">
                            Order Completed on : <h3 className="font-light">15/08/2024</h3> 
                    </h2>
                    <h2 className="flex gap-4 p-2 px-4 font-semibold">
                            Payment Method : <h3 className="font-light">Credit/Debit Card</h3> 
                    </h2>
                    <div className="p-2 px-4">
                        <CustomButton
                            onClick={()=>{}}
                            icon={<MessageCirclePlus size={20} className="text-gray-600"/>}
                            name="Contact seller"
                            variant="outline"
                            className="bg-gray-50 hover:bg-gray-100"
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
