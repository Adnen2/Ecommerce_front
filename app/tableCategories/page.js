import React from "react";
import dynamic from 'next/dynamic'
const AffTableCategories = dynamic(() =>
    import('../../components/AffTableCategories'), {
    loading: () => 'Loading...', ssr: false,
})
async function getCategories() {
    const res = await fetch('http://127.0.0.1:3001/api/categories')
    const categories = await res.json();
    return categories;
}
const tableCategories = async () => {
    const categories = await getCategories();
    return (
        <div className="container mx-auto shadow p-4">
            <AffTableCategories categories={categories} />
        </div>
    )
}
export default tableCategories; 