/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Head from 'next/head';
import { urlFor, client } from '../../lib/client';

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

export default function ProductDetails({ product, similarProducts }) {
  const { incQty, decQty, qty, addToCart } = useStateContext();
  const [index, setIndex] = useState(0);

  return (
    <section>
      <Head>
        <title>{product.name} - E-commerce</title>
      </Head>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              className="product-detail-image"
              src={urlFor(product.image[index])}
              alt={product.name}
              loading="eager"
            />
          </div>
          <div className="small-images-container">
            {product.image?.map((image, i) => (
              <img
                className={
                  i === index ? 'small-image selected-image' : 'small-image'
                }
                key={product._id}
                src={urlFor(image)}
                alt={`${product.name} image ${i + 1}`}
                loading="lazy"
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{product.name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>20</p>
          </div>
          <h4>Details:</h4>
          <p>{product.details}</p>
          <p className="price">${product.price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => addToCart(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {similarProducts?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export async function getStaticPaths() {
  const productQuery = `*[_type == "product"] {
    slug {
      current
    }
  }`;
  const products = await client.fetch(productQuery);

  const paths = products.map((product) => ({
    params: { slug: product.slug.current },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params: { slug } }) {
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(productQuery);

  const similarProductsQuery = `*[_type == "product"]`;
  const similarProducts = await client.fetch(similarProductsQuery);

  return {
    props: {
      product,
      similarProducts,
    },
  };
}
