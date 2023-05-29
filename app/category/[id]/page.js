import React from 'react';
import CategorieDetails from './category';

const CategoryDetailsPage = ({params}) => {
  return (
    <div>
      <CategorieDetails params={params}/>
    </div>
  );
};

export default CategoryDetailsPage;
