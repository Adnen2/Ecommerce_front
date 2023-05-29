"use client"
import React from 'react';
import MUIDataTable from 'mui-datatables';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import AjoutOrder from './ajoutOrders';
import UpdateOrder from './updateOrder';

const AffTableOrders = (props) => {
    const [orders, setOrders] = React.useState(props.orders);

    //Pour actualiser la liste
    const getOrders = async () => {
        const res = await fetch('http://127.0.0.1:3001/api/orders')
        const orders = await res.json();
        setOrders(orders)
    }
    React.useEffect(() => {
        getOrders();

    }, [orders]);

    const handleDelete = async (id) => {
        if (window.confirm("Do you want to delete this order?")) {
            try {
                const response = await fetch(`http://127.0.0.1:3001/api/orders/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    const newOrders = orders.filter((item) => item.id !== id);
                    setOrders(newOrders);
                } else {
                    console.error(`Failed to delete order with id ${id}. Response: ${response.status}`);
                }
            } catch (error) {
                console.error(`Failed to delete order with id ${id}. Error: ${error}`);
            }
        }
    }

    const columns = [
        {
            label: 'stripeId',
            name: 'stripeId',
        },
        {
            label: 'products',
            name: 'products',
            formatter: (cell, row) => cell.join(', ')
        },
        {
            name: "_id",
            label: "Actions",
            options: {
                customBodyRender: (value, tableMeta) => (
                    <div>
                        <UpdateOrder orders={orders[tableMeta.rowIndex]} />
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
            <AjoutOrder />
            {orders && orders.length > 0 ? (
                <MUIDataTable data={orders} columns={columns} />
            ) : null}
        </div>
    );
};

export default AffTableOrders;
