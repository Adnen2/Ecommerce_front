import React from "react"; 
import Image from 'next/image'
const DashboardPage= async ()=> { 
    return ( 
        <div className="">
            <Image src="/SaaS-Dashboard.png" alt="" width="1280" height="300" priority />
        </div>
    ) 
} 
export default DashboardPage; 