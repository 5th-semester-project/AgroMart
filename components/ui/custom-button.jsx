import { Button } from "./button";
import { cn } from "@/lib/utils";

const CustomButton = ({
    onClick,
    className,
    icon,
    name,
    variant
}) => {
    return ( 
        <Button
            onClick={onClick}
            className={cn("flex gap-3 rounded-lg",className)}
            variant={variant}
        >
            {icon}
            {name}
        </Button>
     );
}
 
export default CustomButton;