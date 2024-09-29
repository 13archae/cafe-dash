import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <>
      <div className={styles.container}>
        <div className="row">
          <div className="col-sm-2">&nbsp;</div>
          <div className="col-sm-8">
            <div>Footer</div>;
          </div>
          <div className="col-sm-2">&nbsp;</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
