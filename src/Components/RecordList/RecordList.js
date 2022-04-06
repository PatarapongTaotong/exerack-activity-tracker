import './RecordList.css';
import Record from '../Record/Record';

const RecordList = ({records}) => {
    return (
        <div className="record-list">
            {
                records.map(record => {
                    return <Record record={record} 
                                   key={record.id}  />
                })
            }
        </div>
    );
}

export default RecordList;