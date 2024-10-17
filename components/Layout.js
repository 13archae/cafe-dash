import Footer from "./Footer";
import NavBar from "./Navbar";
import Featured from "./Featured";

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
