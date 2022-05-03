import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 - E-commerce Next &copy; All rights reserved </p>
      <p className="icons">
        <a
          href="https://github.com/thiago-porto25"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillInstagram />
        </a>
        <a
          href="https://www.linkedin.com/in/thiago-porto-675b8320a/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineTwitter />
        </a>
      </p>
    </div>
  );
};
export default Footer;
