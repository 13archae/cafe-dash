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
          <div class="h1 col-sm-9 mb-1">Cafe Dash</div>
          <div class="col-sm-2">&nbsp;</div>
        </div>
      </div>
      <Featured />
    </div>
  );
}
