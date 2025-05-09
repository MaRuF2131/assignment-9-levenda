import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({title,fev}) => {
  const location = useLocation();

  useEffect(() => {
   document.title=title;
   document.querySelector("link[rel*='icon']").href=fev;
    window.scrollTo(0,0);
  }, [location.pathname]); 

  return null; 
};

export default ScrollToTop;
