import './ActivityList.css';
import { useState } from 'react';
import ActivityCard from '../ActivityCard/ActivityCard';
import AddActivityForm from '../AddActivityForm/AddActivityForm';

const ActivityList = () => {
    const [showForm, setShowForm] = useState(false);
    const [activityType, setActivityType] = useState('');
    const [icon, setIcon] = useState('');

    const activityList = ["Run", "Bicycle", "Ride", "Swim", "Walk", "Hike", "Weight-training", "Boxing", "Yoga"];

    const handleClick = (input) => {
        setActivityType(input);

        switch (input) {
            case ('Run'):
                setIcon("fa-solid fa-person-running");
                break;
            case ('Bicycle'):
                setIcon("fa-solid fa-bicycle");
                break;
            case ('Ride'):
                setIcon("fa-solid fa-person-biking-mountain");
                break;
            case ('Swim'):
                setIcon("fa-solid fa-person-swimming");
                break;
            case ('Walk'):
                setIcon("fa-solid fa-person-walking");
                break;
            case ('Hike'):
                setIcon("fa-solid fa-person-hiking");
                break;
            case ('Weight-training'):
                setIcon("fa-solid fa-dumbbell");
                break;
            case ('Boxing'):
                setIcon("fa-solid fa-boxing-glove");
                break;
            case ('Yoga'):
                setIcon("fa-solid fa-child-reaching");
                break;
            default:
                setIcon(null);
        }

        setShowForm(true);    
    }

    const closeForm = () => {
        setShowForm(false);
    }

    return (
        <div className="container section">
            <h2 id="activity-list" className="section-title">Activity List</h2>
            <div className="activity-list">
                {
                    activityList.map(activity => {
                        return <ActivityCard type={activity} key={activity} onClick={() => handleClick(activity)}>{activity}</ActivityCard>
                    })
                }
                {showForm && <AddActivityForm closeForm={closeForm} activityType={activityType} icon={icon} />}
            </div>
        </div>
    );
}

export default ActivityList;