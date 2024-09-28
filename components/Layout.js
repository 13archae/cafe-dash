import Footer from "./Footer";
import Navbar from "./Navbar";
import Featured from "./Featured";
import { AppProvider } from "./context";

const Layout = ({ children }) => {
  return (
    <div>
      <AppProvider>
        <Navbar />
        {children}
        <Footer />
      </AppProvider>
    </div>
  );
};

export default Layout;
