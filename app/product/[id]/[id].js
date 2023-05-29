"use client"
import React, { useState, useEffect } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import Wrapper from "../../../components/Wrapper";
import ProductDetailsCarousel from "../../../components/ProductDetailsCarousel";
import RelatedProducts from "../../../components/RelatedProducts";
import { getDiscountedPricePercentage } from "../../../utils/helper";
import ReactMarkdown from "react-markdown";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../store/cartSlice";
import Footer from '../../../components/Footer';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notFound } from "next/navigation";

async function getProductDetails(id) {
  try {
    const res = await fetch(`http://127.0.0.1:3001/api/products/${id}`);
    const product = await res.json();
    return product;
  }
  catch (error) {
    console.log(error);
  }
}

async function getProducts() {
  const res = await fetch('http://127.0.0.1:3001/api/products');
  const products = await res.json();
  return products;
}

const ProductDetails = ({ params }) => {
  const [product, setProduct] = useState([]);
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);
  const [products, setProducts] = useState([]);
  // const dispatch = useDispatch();

  function handleAddToCart() {
    dispatch(addToCart(product));
  }
  useEffect(() => {
    async function fetchProductDetails() {
      const product = await getProductDetails(params.id);
      if (!product || !product?.name) notFound();
      setProduct(product);
    }
    fetchProductDetails();
  }, [params.id]);

  useEffect(() => {
    async function fetchProducts() {
      const products = await getProducts();
      setProducts(products);
    }
    fetchProducts();
  }, []);

  const notify = () => {
    toast.success("Success. Check your cart!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  if (!product) return null;

  return (
    <>
      <div className="w-full md:py-20">
        <ToastContainer />
        <Wrapper>
          <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
            {/* left column start */}
            <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
              <ProductDetailsCarousel images={product.image} />
            </div>
            {/* left column end */}

            {/* right column start */}
            <div className="flex-[1] py-3">
              {/* PRODUCT TITLE */}
              <div className="text-[34px] font-semibold mb-2 leading-tight">
                {product.name}
              </div>

              {/* PRODUCT SUBTITLE */}
              <div className="text-lg font-semibold mb-5">
                {product.subtitle}
              </div>

              {/* PRODUCT PRICE */}
              <div className="flex items-center">
                <p className="mr-2 text-lg font-semibold">
                  MRP : &#8377;{product.price}
                </p>
                {product.original_price && (
                  <>
                    <p className="text-base  font-medium line-through">
                      &#8377;{product.original_price}
                    </p>
                    <p className="ml-auto text-base font
-medium line-through">
                      &#8377;{product.original_price}
                    </p>
                    <p className="ml-auto text-base font-medium text-green-500">
                      {getDiscountedPricePercentage(
                        product.original_price,
                        product.price
                      )}
                      % off
                    </p>
                  </>
                )}
              </div>

              <div className="text-md font-medium text-black/[0.5]">
                incl. of taxes
              </div>
              <div className="text-md font-medium text-black/[0.5] mb-20">
                {`(Also includes all applicable duties)`}
              </div>

              {/* PRODUCT SIZE RANGE START */}
              <div className="mb-10">
                {/* HEADING START */}
                <div className="flex justify-between mb-2">
                  <div className="text-md font-semibold">
                    Select Size
                  </div>
                  <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                    Select Guide
                  </div>
                </div>
                {/* HEADING END */}

                {/* SIZE START */}
                <div
                  id="sizesGrid"
                  className="grid grid-cols-3 gap-2"
                >
                  {/* {product.size.map((size) => ( */}
                  <div
                    className={`border rounded-md text-center py-3 font-medium ${1
                      ? "hover:border-black cursor-pointer"
                      : "cursor-not-allowed bg-black/[0.1] opacity-50"
                      } ${selectedSize === product.size
                        ? "border-black"
                        : ""
                      }`}
                    onClick={() => {
                      setSelectedSize(product.size);
                      setShowError(false);
                    }}
                  >
                    {product.size}
                  </div>
                  {/* ))}   */}
                </div>
                {/* SIZE END */}

                {/* SHOW ERROR START */}
                {showError && (
                  <div className="text-red-600 mt-1">
                    Size selection is required
                  </div>
                )}
                {/* SHOW ERROR END */}
              </div>
              {/* PRODUCT SIZE RANGE END */}
              {/* ADD TO CART BUTTON START */}
              <button
                className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                onClick={() => {
                  if (!selectedSize) {
                    setShowError(true);
                    document
                      .getElementById("sizesGrid")
                      .scrollIntoView({
                        block: "center",
                        behavior: "smooth",
                      });
                  }
                  else {
                      {handleAddToCart}
                    notify();
                  }
                }}
              >
                Add to Cart
              </button>
              {/* ADD TO CART BUTTON END */}

              {/* WHISHLIST BUTTON START */}
              <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
                Whishlist
                <IoMdHeartEmpty size={20} />
              </button>
              {/* WHISHLIST BUTTON END */}

              <div>
                <div className="text-lg font-bold mb-5">
                  Product Details
                </div>
                <div className="markdown text-md mb-5">
                  <ReactMarkdown>{product.description}</ReactMarkdown>
                </div>
              </div>
            </div>
            {/* right column end */}
          </div>

          <RelatedProducts products={products} />
        </Wrapper>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;

