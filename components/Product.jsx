/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <article>
      <Link href={`/product/${slug.current}`}>
        <a>
          <div className="product-card">
            <img
              loading="lazy"
              className="product-image"
              src={urlFor(image?.[0])}
              alt={name}
              width={250}
              height={250}
            />
            <p className="product-name">{name}</p>
            <p className="product-price">${price}</p>
          </div>
        </a>
      </Link>
    </article>
  );
};
export default Product;
