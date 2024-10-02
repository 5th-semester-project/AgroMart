const AuthLayout = ({children}) => {
    return ( 
        <div className="flex h-screen items-center justify-center relative">
        <img
          src="/bg-images/bg-login.webp"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover  -z-10"
        />
        <div className="relative z-10 p-6 rounded-lg shadow-lg">
          {children}
        </div>
      </div>
     );
}
 
export default AuthLayout;