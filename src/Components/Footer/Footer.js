import './Footer.css';

const Footer = ({children}) => {
    return (
        <div className="footer-background">
            <div className="footer container">
                {children}
            </div>  
        </div>
    );
}

export default Footer;