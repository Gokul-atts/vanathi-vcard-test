import  Logo from "../assets/logo.png"
import  Flower from "../assets/flower.png"
import Marquee from "react-fast-marquee";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} className="logo" />
      </div>

      <div className="help">
        <img src={Flower} alt="phone" />
        <span>உதவி எண் : +91-72 00 33 1442</span>
      </div>

      <Marquee speed={40} pauseOnHover delay={2} gradient={false}><span style={{ paddingRight: "250px" }}>கோவை மக்களுக்கான சேமிப்பை மேம்படுத்த திருமதி வானதி சீனிவாசன் அவர்களால் உருவாக்கப்பட்ட திட்டம்; இதில் பதிவுபெற்ற கடைகளின் தள்ளுபடிகளை பயன்படுத்தி உங்கள் சேமிப்பை உயர்த்துங்கள்.</span></Marquee>
    </header>
  );
};

export default Header;
