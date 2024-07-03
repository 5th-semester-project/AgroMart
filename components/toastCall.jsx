'use client'

import toast from 'react-hot-toast'

const ToastCall = ({message}) => {
    
    return ( 
        <>
            {toast.error(message)}
        </>
     );
}
 
export default ToastCall;