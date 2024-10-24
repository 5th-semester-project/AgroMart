import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(["/",'/sign-in(.*)', '/sign-up(.*)','/api/buyer/:path*','/product/:path*','/store/:path*','/buyer','/api/pusher/auth','/api/checkout/notifyPayment']);

export default clerkMiddleware((auth, request) =>{
  
  if(!isPublicRoute(request)){
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}