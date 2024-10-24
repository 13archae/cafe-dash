import Footer from "./Footer";
import NavBar from "./Navbar";
import Featured from "./Featured";
import { AppContext } from "./context";

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
