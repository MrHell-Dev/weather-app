/** @type {import('next').NextConfig} */
import path from 'path';
import dotenv from 'dotenv';

const dirname = path.resolve();
dotenv.config({ path: './env' });
const nextConfig = {
    reactStrictMode: false,
    output: 'standalone',
    sassOptions: {
        includePaths: [path.join(dirname, 'styles')],
    },
};
export default nextConfig;
