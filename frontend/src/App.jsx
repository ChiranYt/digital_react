import React from "react";
import "font-awesome/css/font-awesome.min.css";
import Header from "./components/Header";
import Goals from "./goals/Goals";
import Testiminials from "./testimonials/Testiminials";
import You from "./you/You";
import Footer from "./components/Footer";
import MarketingHead from "./pages/Marketing-head";

const App = () => {
  return (
    <div>
      <Header />
      <MarketingHead />
      <Goals />
      <You />
      <Testiminials />
      <Footer />
    </div>
  );
};

export default App;
