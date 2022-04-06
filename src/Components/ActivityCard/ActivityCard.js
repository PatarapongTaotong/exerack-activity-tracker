import './ActivityCard.css';

const ActivityCard = ({type, onClick, children}) => {
    return (
        <div className={`${type} card-pattern hover-elevate`} onClick={onClick}>
            <h3 className="activity-card-title">{children}</h3>
        </div>
    );
}

export default ActivityCard;