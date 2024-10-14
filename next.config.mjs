/** @type {import('next').NextConfig} */
import { makeEnvPublic }  from 'next-runtime-env';

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                pathname: '/**'
            },

        ]
    },
    
    
};

makeEnvPublic(['DOMAIN_URL', 'MERCHANT_ID','MERCHANT_SECRET','NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME','PUSHER_APP_ID','PUSHER_APP_KEY','PUSHER_SECRET','PUSHER_CLUSTER']);

export default nextConfig;
