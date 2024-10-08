import Footer from "./Footer";
import Navbar from "./NavBar";
import Featured from "./Featured";

const Layout = ({ children }) => {
  return (
    <div>
    
        <Navbar />
        {children}
        <Footer />
      
    </div>
  );
};

export default Layout;
