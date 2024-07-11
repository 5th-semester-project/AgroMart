'use client'

import axios from "axios"
import { ImageUp ,SendHorizontal } from "lucide-react";
import { useForm,SubmitHandler,FieldValues } from "react-hook-form"

const FormMessage = ({conversationId}) => {

    const {
        register,
        handleSubmit,
        setValue,
        errors
    } = useForm({
        defaultValues:{
            message:""
        }
    });

    const onSubmit = async (data) => {

        setValue("message","",{shouldValidate:true});
        axios.post("/api/messages",{
            ...data,
            conversationId,
        
        })
    }

    return ( 

        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center w-full gap-4">
                <ImageUp 
                    size={40} 
                    className="text-muted-foreground p-2 ml-2 cursor-pointer hover:bg-gray-100 rounded-lg hover:text-blue-500"
                />
                <input 
                    type="text" 
                    name="message" 
                    required
                    register={register}
                    errors={errors}
                    className="w-full p-1 text-sm px-2 rounded-lg border-0 bg-gray-200 focus:outline-none focus:border-none"
                    placeholder="Type a message"
                />
                <button type="submit" className="text-muted-foreground p-2 mr-2 cursor-pointer hover:bg-gray-100 rounded-lg hover:text-blue-500">
                    <SendHorizontal size={25}/>
                </button>
            </form>
        </div>

     );
}
 
export default FormMessage;