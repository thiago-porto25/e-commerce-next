import { FooterBanner, HeroBanner, Product } from '../components';
import { client } from '../lib/client';

export default function Home({ products, banners }) {
  return (
    <>
      <HeroBanner heroBanner={banners?.[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => product.name)}
      </div>
      <FooterBanner />
    </>
  );
}

export async function getServerSideProps() {
  const productQuery = `*[_type == "product"]`;
  const products = await client.fetch(productQuery);

  const bannerQuery = `*[_type == "banner"]`;
  const banners = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      banners,
    },
  };
}
