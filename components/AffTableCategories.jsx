"use client"
import React from 'react';
import MUIDataTable from 'mui-datatables';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import AjoutCat from './ajoutCategories';
import UpdateCategorie from './updateCategory';

const AffTableCategories = (props) => {
    const [categories, setCategories] = React.useState(props.categories);

    //Pour actualiser la liste
    const getCategories = async () => {
        const res = await fetch('http://127.0.0.1:3001/api/categories')
        const categories = await res.json();
        setCategories(categories)
    }
    React.useEffect(() => {
        getCategories();

    }, [categories]);

    const handleDelete = async (id) => {
        if (window.confirm("Do you want to delete this category?")) {
            try {
                const response = await fetch(`http://127.0.0.1:3001/api/categories/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    const newCategories = categories.filter((item) => item.id !== id);
                    setCategories(newCategories);
                } else {
                    console.error(`Failed to delete categorie with id ${id}. Response: ${response.status}`);
                }
            } catch (error) {
                console.error(`Failed to delete categorie with id ${id}. Error: ${error}`);
            }
        }
    }

    const columns = [
        {
            label: 'Title',
            name: 'name',
        },
        {
            label: 'slug',
            name: 'slug',
        },
        {
            name: "_id",
            label: "Actions",
            options: {
                customBodyRender: (value, tableMeta) => (
                    <div>
                        <UpdateCategorie categories={categories[tableMeta.rowIndex]} />
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
            <AjoutCat />
            {categories && categories.length > 0 ? (
                <MUIDataTable data={categories} columns={columns} />
            ) : null}
        </div>
    );
};

export default AffTableCategories;
