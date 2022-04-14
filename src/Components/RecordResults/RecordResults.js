import './RecordResults.css';
import RecordList from '../RecordList/RecordList';

const RecordResults = ({recordData, onClickRecord}) => {
    return (
        <div className="record-results">
            <div className="record-results-header">
                <div className="record-title">Records</div>
                <div className="search-box">
                    <p>Sort by</p>
                    <select id="cars" name="cars">
                        <option value="show all">Show all</option>
                        <option value="run">Run</option>
                        <option value="bicycle">Bicycle</option>
                        <option value="ride">Ride</option>
                        <option value="swim">Swim</option>
                        <option value="walk">Walk</option>
                        <option value="hike">Hike</option>
                        <option value="weight-training">Weight-training</option>
                        <option value="boxing">Boxing</option>
                        <option value="yoga">Yoga</option>
                    </select>
                </div> 
            </div>
            <RecordList records={recordData} onClickRecord={onClickRecord} />
        </div>
    );
}

export default RecordResults;