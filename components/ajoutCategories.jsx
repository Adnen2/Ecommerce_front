"use client";
import React, { useState } from 'react';
import { TextField, Box, Button, Modal, Typography } from '@mui/material';
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

function AjoutCat() {

   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   const [inputs, setInputs] = useState({});
   const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setInputs(values => ({ ...values, [name]: value }))
   }

   const handlesave = async () => {
      const res = await (await
         fetch('http://127.0.0.1:3001/api/categories', {
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {
               'Content-Type': 'application/json'
            }
         })).json()
      if (res) {
         console.log('successfully inserted!')

         handleClose()

      }
      else {
         console.log(res);
      }
   }
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
                  Add Category
               </Typography>


               <div className="mb-4">
                  <TextField variant="outlined" name="name" label="Name"
                     onChange={handleChange} />
               </div>

               <div className="mb-4">
                  <TextField variant="outlined" name="slug" label="slug"
                     onChange={handleChange} />
               </div>
              
               <div className="mb-3">
                  <Button type="button" className="btn btn-danger"
                     onClick={handlesave}>Save</Button>
                  <Button type="button" className="btn btn-secondary"
                     onClick={handleClose}>Close</Button>
               </div>
            </Box>
         </Modal>
      </div>
   )
}
export default AjoutCat 