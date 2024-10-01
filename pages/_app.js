import Layout from "../components/Layout";
import "@/styles/globals.css";
import "/styles/bootstrap.min.css";
import dotenv from "dotenv";
import { AppContext } from "@/components/context";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  dotenv.config();

const [user, setUser] = useState(null);
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [cart, setCart] = useState([]);


  return (
    <AppContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}
