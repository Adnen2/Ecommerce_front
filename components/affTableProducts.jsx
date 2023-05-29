"use client"
import React from 'react';
import MUIDataTable from 'mui-datatables';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import AjoutProd from './ajoutProducts';
import UpdateProduct from './updateProduct';

const AffTableProducts = (props) => {
    const [products, setProducts] = React.useState(props.products);

    //Pour actualiser la liste
    const getProducts = async () => {
        const res = await fetch('http://127.0.0.1:3001/api/products')
        const products = await res.json();
        setProducts(products)
    }
    React.useEffect(() => {
        getProducts();

    }, [products]);

    const handleDelete = async (id) => {
        if (window.confirm("Do you want to delete this product?")) {
            try {
                const response = await fetch(`http://127.0.0.1:3001/api/products/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    const newProducts = products.filter((item) => item.id !== id);
                    setProducts(newProducts);
                } else {
                    console.error(`Failed to delete product with id ${id}. Response: ${response.status}`);
                }
            } catch (error) {
                console.error(`Failed to delete product with id ${id}. Error: ${error}`);
            }
        }
    }

    const columns = [
        {
            label: 'Title',
            name: 'name',
            style: {
                width: 60
            }
        },
        {
            label: 'image',
            name: 'thumbnail',
            options: {
                customBodyRender: (rowdata) => (
                    <img
                        style={{ height: 50, width: 60, borderRadius: '10%' }}
                        src={`${rowdata}`}
                    />
                ),
            },
        },
        {
            name: "_id",
            label: "Actions",
            options: {
                customBodyRender: (value, tableMeta) => (
                    <div>
                        <UpdateProduct products={products[tableMeta.rowIndex]} />
                        <span
                            onClick={(e) => handleDelete(value)}
                            style={{ cursor: 'pointer' }}
                        >
                            <DeleteForeverRoundedIcon color='error' />
                        </span>
                    </div>
                )
            }
        }
    ];

    return (
        <div>
            <AjoutProd />
            {products && products.length > 0 ? (
                <MUIDataTable title="Products List" data={products} columns={columns} />
            ) : null}
        </div>
    );
};

export default AffTableProducts;
