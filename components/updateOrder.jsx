"use client";
import React, { useState, useEffect } from 'react';
import { TextField, Box, Button, Modal, Typography, MenuItem } from '@mui/material';
import NoteAlt from '@mui/icons-material/NoteAlt';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    height: 300,
    maxHeight: 2000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    color: '#000',
    borderRadius: '20px',
    padding: '40px 30px 60px',
    textAlign: 'center',
};
async function getProducts() {
    const res = await fetch('http://127.0.0.1:3001/api/products');
    const products = await res.json();
    return products;
  }
function UpdateOrder(props) {


    const id = props.orders._id;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [inputs, setInputs] = useState(props.orders);
    const [products, setProducts] = useState([]);
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handlesave = async () => {

        const res = await (await
            fetch('http://127.0.0.1:3001/api/orders/' + id, {
                method: 'PATCH',
                body: JSON.stringify(inputs),
                headers: {
                    'Content-Type': 'application/json'
                }
            })).json()
        if (res) {
            console.log('successfully updated!')

            handleClose()

        }
        else {
            console.log(res);
        }
    }
    useEffect(() => {
        async function fetchProducts() {
          const products = await getProducts();
          setProducts(products);
        }
        fetchProducts();
      }, []);

    return (
        <>
            <span onClick={handleOpen}
                style={{ cursor: 'pointer' }}>
                <NoteAlt color='success' />
            </span>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update Order
                    </Typography>
                    <hr />

                    <div className="mb-4">
                        <TextField variant="outlined" value={inputs.stripeId} name="stripeId"
                            label="stripeId" onChange={handleChange} />
                    </div>
                    <div className="mb-4">

                        <TextField
                            select
                            label="products"
                            name="products"
                            value={inputs.product}
                            onChange={handleChange}
                        >
                            {products.map((product) => (
                                <MenuItem value={product._id}>{product.name}</MenuItem>
                            ))}
                        </TextField>

                    </div>

                    <hr />
                    <div className="mb-3">
                        <Button type="button" className="btn btn-success"
                            onClick={handlesave}>Update</Button>
                        <Button type="button" className="btn btn-secondary"
                            onClick={handleClose}>Close</Button>
                    </div>

                </Box>
            </Modal>
        </>
    )
}
export default UpdateOrder