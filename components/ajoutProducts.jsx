import React, { useState } from 'react';
import { TextField, Box, Button, Modal, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  height: 900,
  maxHeight: 2000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  color: '#000',
  borderRadius: '20px',
  padding: '40px 30px 60px',
  textAlign: 'center',
};

function AjoutProd() {
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    image: '',
    subtitle: '',
    price: '',
    description: '',
    size: '',
    thumbnail: '',
    original_price: '',
    categories: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handlesave = async () => {
    try {
      const res = await fetch('http://127.0.0.1:3001/api/products', {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        console.log('Product successfully inserted!');
        handleClose();
      } else {
        console.log('Error inserting product:', res.status);
      }
    } catch (error) {
      console.log('Error inserting product:', error);
    }
  };

  return (
    <div>
      <Button type="button" className="btn btn-primary" onClick={handleOpen}>
        ADD
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Product
          </Typography>

          <div className="mb-4">
            <TextField
              variant="outlined"
              name="name"
              label="Name"
              value={inputs.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <TextField
              variant="outlined"
              name="image"
              label="Image"
              value={inputs.image}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <TextField
              variant="outlined"
              name="subtitle"
              label="Subtitle"
              value={inputs.subtitle}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <TextField
              variant="outlined"
              name="price"
              label="Price"
              value={inputs.price}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <TextField
              variant="outlined"
              name="description"
              label="Description"
              value={inputs.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <TextField
              variant="outlined"
              name="size"
              label="Size"
              value={inputs.size}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <TextField
              variant="outlined"
              name="thumbnail"
              label="Thumbnail"
              value={inputs.thumbnail}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <TextField
              variant="outlined"
              name="original_price"
              label="Original Price"
              value={inputs.original_price}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <TextField
              variant="outlined"
              name="categories"
              label="Categories"
              value={inputs.categories}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <Button type="button" className="btn btn-danger" onClick={handlesave}>
              Save
            </Button>
            <Button type="button" className="btn btn-secondary" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default AjoutProd;
