import './Record.css';
import dayjs from 'dayjs';

const Record = ({record, onClick}) => {
    return (
        <div className="record hover-elevate" onClick={onClick}>
            <div className="record-icon">
                <p><i className={record.icon}></i></p>
            </div>
            <div className="record-date">
                <p>{dayjs(record.date).format('DD MMM YYYY')}</p>
                <p>{record.duration} mins</p>
            </div>
            <div className="record-information">
                <h3>{record.activityName}</h3>
                <p>{record.activityDescription}</p>
            </div>      
        </div>
    );
}

export default Record;