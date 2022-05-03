import Head from 'next/head';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Next e-commerce</title>
        <meta
          name="description"
          content="Fake e-commerce site made with NextJS, Sanity CMS and Stripe"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
export default Layout;
