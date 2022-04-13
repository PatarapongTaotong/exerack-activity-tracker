import './Record.css';
import dayjs from 'dayjs';

const Record = ({record, onClick}) => {
    return (
        <div className="record hover-elevate" onClick={onClick}>
            <div className="record-icon">
                <p><i className={record.icon}></i></p>
            </div>
            <div className="record-information">
                <h3>{record.activityName}</h3>
                <p>{record.activityDescription}</p>
                <p>{dayjs(record.date).format('DD MMM YYYY')} | {record.duration} mins</p>
            </div>      
        </div>
    );
}

export default Record;