import './RecordBar.css';
import { useState } from 'react';
import RecordResults from '../RecordResults/RecordResults';

const RecordBar = () => {
    const [recordData, setRecordData] = useState([ {id:"1", name:"Run", date: "23 Mar 2022", duration: "60 mins", description: "At JJ park with Joe, Sara and Paul", icon: <i className="fa-solid fa-person-running"></i>},
    {id:"2", name:"Run", date: "23 Mar 2022", duration: "60 mins", description: "At JJ park with Joe, Sara and Paul", icon: <i className="fa-solid fa-person-running"></i>},
    {id:"3", name:"Run", date: "23 Mar 2022", duration: "60 mins", description: "At JJ park with Joe, Sara and Paul", icon: <i className="fa-solid fa-person-running"></i>} ]);

    return (
        <div className="container section">
            <div>
                <h2 className="section-title">Hi Rowan Row, welcome to Exerack</h2>
            </div>
            <div className="home-main-section">
                <RecordResults recordData={recordData} />
                <div className="avatar">
                    <img src="./Images/avatar.png" alt="Profile image" className="avatar-image" />
                </div>
            </div>
        </div>
    );
}

export default RecordBar;