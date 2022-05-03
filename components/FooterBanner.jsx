/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

import { urlFor } from '../lib/client';

const FooterBanner = ({ footerBanner }) => {
  return (
    <section className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{footerBanner.discount}</p>
          <h3>{footerBanner.largeText1}</h3>
          <h3>{footerBanner.largeText2}</h3>
          <p>{footerBanner.saleTime}</p>
        </div>
        <div className="right">
          <p>{footerBanner.smallText}</p>
          <h3>{footerBanner.midText}</h3>
          <p>{footerBanner.desc}</p>
          <Link href={`/product/${footerBanner.product}`} passHref>
            <a>
              <button type="button">{footerBanner.buttonText}</button>
            </a>
          </Link>
        </div>
        <img
          className="footer-banner-image"
          loading="lazy"
          src={urlFor(footerBanner.image)}
          alt={footerBanner.product}
        />
      </div>
    </section>
  );
};
export default FooterBanner;
