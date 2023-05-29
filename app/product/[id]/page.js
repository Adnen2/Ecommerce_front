import React from 'react';
import ProductDetails from './[id]';
import Header from '../../../components/Header';


const ProductDetailsPage = ({params}) => {
  return (
    <div>
      <Header />
      <ProductDetails params={params} />
    </div>
  );
};

export default ProductDetailsPage;
