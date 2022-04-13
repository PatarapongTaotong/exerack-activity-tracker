import './RecordList.css';
import Record from '../Record/Record';

const RecordList = ({records, onClickRecord}) => {
    return (
        <div className="record-list">
            {
                records.map(record => {
                    return <Record record={record} 
                                   key={record.id}  
                                   onClick={() => onClickRecord(record)} />
                })
            }
        </div>
    );
}

export default RecordList;