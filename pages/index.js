import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Featured from "@/components/Featured";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title> Cafe Dash</title>
        <meta name="description" conntent="Cafe Dash" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div class="container">
        <div class="row">
          <div class="col-sm-1">&nbsp;</div>
          <div class="h5 col-sm-10 mb-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
          <div class="col-sm-1">&nbsp;</div>
        </div>
      </div>
      <Featured />
    </div>
  );
}
