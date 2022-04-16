import './RecordResults.css';
import RecordList from '../RecordList/RecordList';

const RecordResults = ({recordData, onClickRecord, onSelectType}) => {

    const selectedType = (event) => {
        onSelectType(event.target.value);
    }

    return (
        <>
        <div className="record-results-header">
            <div className="record-title">Records</div>
            <div className="search-box">
                <p>Sort by</p>
                <select id="type-select" name="type-select" onChange={selectedType}>
                    <option value="Show all">Show all</option>
                    <option value="Run">Run</option>
                    <option value="Bicycle">Bicycle</option>
                    <option value="Ride">Ride</option>
                    <option value="Swim">Swim</option>
                    <option value="Walk">Walk</option>
                    <option value="Hike">Hike</option>
                    <option value="Weight-training">Weight-training</option>
                    <option value="Boxing">Boxing</option>
                    <option value="Yoga">Yoga</option>
                </select>
            </div> 
        </div>
        <div className="record-results">
            
            <RecordList records={recordData} onClickRecord={onClickRecord} />
        </div>
        </>
    );
}

export default RecordResults;