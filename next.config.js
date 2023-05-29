/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    images:{ 
      domains:["127.0.0.1:3001/api/products","api.lorem.space","firebasestorage.googleapis.com","cdn-icons-png.flaticon.com"], 
      } 
  }
  
  module.exports = nextConfig
  