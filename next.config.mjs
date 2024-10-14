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

export default nextConfig;
