import './ActivityList.css';
import { useState, useEffect } from 'react';
import ActivityCard from '../ActivityCard/ActivityCard';
import AddActivityForm from '../AddActivityForm/AddActivityForm';

const ActivityList = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [activityType, setActivityType] = useState('');
    const [activityList, setActivityList] = useState(["Run", "Bicycle", "Ride", "Swim", "Walk", "Hike", "Weight-training", "Boxing", "Yoga"]);

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
                {
                    activityList.map(activity => {
                        return <ActivityCard type={activity} onClick={() => handleClick(activity)}>{activity}</ActivityCard>
                    })
                }
                {showForm && <AddActivityForm closeForm={closeForm} activityType={activityType} />}
            </div>
        </div>
    );
}

export default ActivityList;