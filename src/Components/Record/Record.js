import './Record.css';

const Record = ({record}) => {
    return (
        <div className="record hover-elevate">
            <div className="record-icon">
                <p>{record.icon}</p>
            </div>
            <div className="record-information">
                <h3>{record.name}</h3>
                <p>{record.description}</p>
                <p>{record.date} | {record.duration}</p>
            </div>      
        </div>
    );
}

export default Record;