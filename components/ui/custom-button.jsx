import { Button } from "./button";
import { cn } from "@/lib/utils";

const CustomButton = ({
    onClick,
    className,
    icon,
    name
}) => {
    return ( 
        <Button
            onClick={onClick}
            className={cn("flex gap-3 rounded-lg bg-gray-900",className)}
        >
            {icon}
            {name}
        </Button>
     );
}
 
export default CustomButton;