

const Footer = () => {
    return ( 
        <div className="px-4 w-full items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-20">
                <div className="flex items-center text-center flex-col sm:items-start sm:text-start space-y-2">
                    <h1 className="text-3xl font-bold">Logo</h1>
                    <h1 className="text-xl font-bold">Our Vision</h1>
                    <p className="text-sm">We are a group of students from the University of Lagos, Nigeria. We are working on a project for our Advanced Engineering course.</p>
                </div>
                <div className="flex items-center text-center flex-col  space-y-2">
                
                    <h1 className="text-xl font-bold ">Our Vision</h1>
                    <p className="text-sm">We are a group </p>
                    <p className="text-sm">We are a group </p>
                    <p className="text-sm">We are a group </p>
                    <p className="text-sm">We are a group </p>
                </div>
                <div className="flex items-center text-center flex-col sm:items-end sm:text-end space-y-2">
                    
                    <h1 className="text-xl font-bold ">Our Vision</h1>
                    <p className="text-sm">We are a group </p>
                    <p className="text-sm">We are a group </p>
                    <p className="text-sm">We are a group </p>
                    <p className="text-sm">We are a group </p>
                </div>
            </div>
            <p className="text-center text-xs text-black mt-6">
                    &copy; 2024 agriculture Store. All rights reserved.
            </p>
        </div>
     );
}
 
export default Footer;