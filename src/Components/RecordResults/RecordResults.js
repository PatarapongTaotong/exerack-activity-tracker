import './RecordResults.css';
import RecordList from '../RecordList/RecordList';
import Button from '../Button/Button';

const RecordResults = ({recordData}) => {
    return (
        <div className="record-results">
            <div className="record-results-header">
                <div className="record-title">Records</div>
                <Button link="/activities">ADD</Button>
            </div>
            <RecordList records={recordData} />
        </div>
    );
}

export default RecordResults;