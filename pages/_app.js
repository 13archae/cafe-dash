import Layout from "../components/Layout";
import "@/styles/globals.css";
import "../styles/bootstrap.min.css";
import dotenv from "dotenv";

export default function App({ Component, pageProps }) {
  dotenv.config();
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
