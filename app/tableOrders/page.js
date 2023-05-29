import React from "react";
import dynamic from 'next/dynamic'
const AffTableOrders = dynamic(() =>
    import('../../components/affTableOrders'), {
    loading: () => 'Loading...', ssr: false,
})
async function getOrders() {
    const res = await fetch('http://127.0.0.1:3001/api/orders')
    const orders = await res.json();
    return orders;
}
const tableOrders = async () => {
    const orders = await getOrders();
    return (
        <div className="container mx-auto shadow p-4">
            <AffTableOrders orders={orders} />
        </div>
    )
}
export default tableOrders; 