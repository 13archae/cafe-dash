import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Featured = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.imgContainer}>
          <Image
            src="/img/OysterBar.png"
            alt="featured restaurant"
            width="800"
            height="400"
          />
        </div>
      </div>
    </div>
  );
};

export default Featured;
