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
                setIcon('<i className="fa-solid fa-person-running"></i>');
                break;
            case ('Bicycle'):
                setIcon('<i class="fa-solid fa-bicycle"></i>');
                break;
            case ('Ride'):
                setIcon('<i class="fa-solid fa-person-biking-mountain"></i>');
                break;
            case ('Swim'):
                setIcon('<i class="fa-solid fa-person-swimming"></i>');
                break;
            case ('Walk'):
                setIcon('<i class="fa-solid fa-person-walking"></i>');
                break;
            case ('Hike'):
                setIcon('<i class="fa-solid fa-person-hiking"></i>');
                break;
            case ('Weight-training'):
                setIcon('<i class="fa-solid fa-dumbbell"></i>');
                break;
            case ('Boxing'):
                setIcon('<i class="fa-solid fa-boxing-glove"></i>');
                break;
            case ('Yoga'):
                setIcon('<i class="fa-solid fa-child-reaching"></i>');
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
            <h2 className="section-title">Activity List</h2>
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