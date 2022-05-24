import React,{useEffect,useState} from "react";
import '../Navbar.css';

function Navbar() {
    const [show, handleShow] = useState(false);

    useEffect(() => {
      window.addEventListener("scroll",()=>{
          if(window.scrollY > 100){
            handleShow(true);
          }else handleShow(false);
      },{passsive:true});
      return ()=>{
          window.removeEventListener("scroll",null);
      };
    }, []);
    
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://www.edigitalagency.com.au/wp-content/uploads/Netflix-logo-red-black-png.png"
        alt="Netflix Logo"
      />
      <img
        className="nav_avatar"
        src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/bf6e4a33850498.56ba69ac3064f.png"
        alt="Netflix Avatar"
      />
    </div>
  );
}

export default Navbar;
