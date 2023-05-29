"use client";
import React, { useState } from 'react';
import { TextField, Box, Button, Modal, Typography } from '@mui/material';
import NoteAlt from '@mui/icons-material/NoteAlt';
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
function UpdateProduct(props) {


   const id = props.products._id;
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   const [inputs, setInputs] = useState(props.products);
   const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setInputs(values => ({ ...values, [name]: value }))
   }

   const handlesave = async () => {

      const res = await (await
         fetch('http://127.0.0.1:3001/api/products/' + id, {
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
                  Update Product
               </Typography>
               <hr />

               <div className="mb-4">
                  <TextField variant="outlined" value={inputs.name} name="name"
                     label="Name" onChange={handleChange} />
               </div>
               <div className="mb-4">
                  <TextField
                     variant="outlined"
                     name="image"
                     value={inputs.image}
                     onChange={handleChange}
                  />
               </div>
               <div className="mb-4">
                  <TextField
                     variant="outlined"
                     value={inputs.subtitle}
                     name="subtitle"
                     label="Subtitle"
                     onChange={handleChange}
                  />
               </div>

               <div className="mb-4">
                  <TextField
                     variant="outlined"
                     value={inputs.price}
                     name="price"
                     label="Price"
                     onChange={handleChange}
                  />
               </div>

               <div className="mb-4">
                  <TextField
                     variant="outlined"
                     value={inputs.description}
                     name="description"
                     label="Description"
                     onChange={handleChange}
                  />
               </div>

               <div className="mb-4">
                  <TextField
                     variant="outlined"
                     value={inputs.size}
                     name="size"
                     label="Size"
                     onChange={handleChange}
                  />
               </div>

               <div className="mb-4">
                  <TextField
                     variant="outlined"
                     value={inputs.thumbnail}
                     name="thumbnail"
                     label="Thumbnail"
                     onChange={handleChange}
                  />
               </div>

               <div className="mb-4">
                  <TextField
                     variant="outlined"
                     value={inputs.original_price}
                     name="original_price"
                     label="Original Price"
                     onChange={handleChange}
                  />
               </div>

               <div className="mb-4">
                  <TextField
                     variant="outlined"
                     value={inputs.categories}
                     name="categories"
                     label="Categories"
                     onChange={handleChange}
                  />
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
export default UpdateProduct