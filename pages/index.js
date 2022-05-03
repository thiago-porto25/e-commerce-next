import { FooterBanner, HeroBanner, Product } from '../components';
import { client } from '../lib/client';

export default function Home({ products, headerBanner, footerBanner }) {
  return (
    <>
      <HeroBanner heroBanner={headerBanner[0]} />
      <section className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </section>
      <section className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </section>
      <FooterBanner footerBanner={footerBanner[0]} />
    </>
  );
}

export async function getServerSideProps() {
  const productQuery = `*[_type == "product"]`;
  const products = await client.fetch(productQuery);

  const headerBannerQuery = `*[_type == "headerBanner"]`;
  const headerBanner = await client.fetch(headerBannerQuery);

  const footerBannerQuery = `*[_type == "footerBanner"]`;
  const footerBanner = await client.fetch(footerBannerQuery);

  return {
    props: {
      products,
      headerBanner,
      footerBanner,
    },
  };
}
