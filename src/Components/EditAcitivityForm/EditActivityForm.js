import './EditActivityForm.css';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import ActivityProvider from '../../Resources/ActivityProvider';

const ActivityService = new ActivityProvider();

const EditActivityForm = ({closeForm, activityType, icon, editData, onEdit}) => {
    const [activityName, setActivityName] = useState('');
    const [isNameOk, setIsNameOk] = useState(false);
    const [activityDescription, setActivityDescription] = useState('');
    const [isDescriptionOk, setIsDescriptionOk] = useState(false);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [isTimeOk, setIsTimeOk] = useState(false);

    useEffect(() => {
        setActivityName(editData.activityName);
        setActivityDescription(editData.activityDescription);
        setDate(dayjs(editData.date).format('YYYY-MM-DD'));
        setTime(editData.duration);
    }, [editData])

    const onChangeName = (e) => {
        setActivityName(e.target.value);       
    }

    useEffect (() => {
        if (activityName.length > 0 && activityName.length < 5) {
            setIsNameOk(true);
            document.getElementById("submit").disabled = true;
        } else {
            setIsNameOk(false);
            document.getElementById("submit").disabled = false;
        }
    }, [activityName])

    const onChangeDescription = (e) => {
        setActivityDescription(e.target.value);  
    }

    useEffect (() => {
        if (activityDescription.length > 0 && activityDescription.length < 11) {
            setIsDescriptionOk(true);
            document.getElementById("submit").disabled = true;
        } else {
            setIsDescriptionOk(false);
            document.getElementById("submit").disabled = false;
        }
    }, [activityDescription])

    const onChangeDate = (e) => {
        setDate(e.target.value);  
    }

    const onChangeTime = (e) => {
        setTime(e.target.value);  
    }

    useEffect (() => {
        if (time === '') {
            setIsTimeOk(false);
        } else if (time < 1) {
            setIsTimeOk(true);
            document.getElementById("submit").disabled = true;
        } else {
            setIsTimeOk(false);
            document.getElementById("submit").disabled = false;
        }
    }, [time])

    const onSubmit = async (event) => {
        try {
            const payload = {
                userId: editData.userId,
                activityType,
                icon,
                activityName,
                activityDescription,
                date,
                duration: time
            }

            event.preventDefault();
            const data = await ActivityService.editActivityByUserId(editData.id, payload);
            if (data) {
                onEdit();
                closeForm();
            }
            
        } catch (error) {
            console.log({error});
        }
    }

    return (
        <div id="edit-activity-form">
            <form action="#" className="form-container" onSubmit={onSubmit}>
                <h3>Edit Activity</h3>
                
                <label htmlFor="ac-type" className="label">Activity Type</label>
                <input id="ac-type" name="ac-type" type="text" value={activityType} readOnly />
                
                <div>
                    <label htmlFor="ac-name" className="label">Name</label>
                    <input id="ac-name" name="ac-name" type="text" placeholder="Enter activity name" value={activityName} onChange={onChangeName} required />
                    {isNameOk && <div className="error-text">Name should contain at least 4 characters</div>}
                </div>
                
                <div>
                    <label htmlFor="ac-describe" className="label">Description</label>
                    <textarea id="ac-describe" name="ac-describe" type="text" placeholder="Enter activity description" value={activityDescription} onChange={onChangeDescription} required />
                    {isDescriptionOk && <div className="error-text">Description should contain at least 10 characters</div>}
                </div>
                
                <label htmlFor="ac-date" className="label">Date</label>
                <input id="ac-date" name="ac-date" type="date" value={date} onChange={onChangeDate} required />

                <div>
                    <label htmlFor="ac-duration" className="label">Duration</label>
                    <input id="ac-duration" name="ac-duration" type="number" placeholder="Enter time in minutes" value={time} onChange={onChangeTime} required />
                    {isTimeOk && <div className="error-text">Duration should be positive integer</div>}
                </div>
                
                <button id="submit" type="submit" className="btn">Keep Change</button>
                <button type="button" className="btn delete">Delete</button>
                <button type="button" className="btn cancel" onClick={closeForm}>Close</button>

            </form>
        </div>
    );
}

export default EditActivityForm;