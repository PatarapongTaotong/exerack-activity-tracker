import './ActivityList.css';
import { useState, useEffect } from 'react';
import ActivityCard from '../ActivityCard/ActivityCard';
import AddActivityForm from '../AddActivityForm/AddActivityForm';

const ActivityList = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [activityType, setActivityType] = useState('');

    const handleClick = (input) => {
        setActivityType(input);
        setShowForm(true);    
    }

    const closeForm = () => {
        setShowForm(false);
    }

    return (
        <div className="container section">
            <h2 className="section-title">Activity List</h2>
            <div className="activity-list">
                <ActivityCard type="Run" onClick={() => handleClick('Run')}>Run</ActivityCard>
                <ActivityCard type="Bicycle" onClick={() => handleClick('Bicycle')}>Bicycle</ActivityCard>
                <ActivityCard type="Ride" onClick={() => handleClick('Ride')}>Ride</ActivityCard>
                <ActivityCard type="Swim" onClick={() => handleClick('Swim')}>Swim</ActivityCard>
                <ActivityCard type="Walk" onClick={() => handleClick('Walk')}>Walk</ActivityCard>
                <ActivityCard type="Hike" onClick={() => handleClick('Hike')}>Hike</ActivityCard>
                <ActivityCard type="Weight-training" onClick={() => handleClick('Weight-training')}>Weight<br />training</ActivityCard>
                <ActivityCard type="Boxing" onClick={() => handleClick('Boxing')}>Boxing</ActivityCard>
                <ActivityCard type="Yoga" onClick={() => handleClick('Yoga')}>Yoga</ActivityCard>
                {showForm && <AddActivityForm closeForm={closeForm} activityType={activityType} />}
            </div>
        </div>
    );
}

export default ActivityList;