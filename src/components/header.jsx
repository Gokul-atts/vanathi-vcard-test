import  Logo from "../assets/logo.png"
import  Flower from "../assets/flower.png"

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
    </header>
  );
};

export default Header;
