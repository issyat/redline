import Authentication from "./Authentication";
import Carousel from "./Carousel";
import Navbar from "./Navbar";

const Header = () => {
    return (
        <header>
            <Navbar />
            <Carousel />
            <Authentication />
        </header>
    );
}

export default Header;