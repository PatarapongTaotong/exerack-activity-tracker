import './MainBoard.css';

const MainBoard = ({title, children, background}) => {
    return (
        <div className={`${background} section`}>
            <h1 className="mainboard-text container">
                {title} <br />
                {children}
            </h1>
        </div>
        
    );
}

export default MainBoard;