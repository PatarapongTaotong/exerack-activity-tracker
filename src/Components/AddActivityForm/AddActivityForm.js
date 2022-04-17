import './AddActivityForm.css';
import { useState, useEffect } from 'react';
import ActivityProvider from '../../Resources/ActivityProvider';
import { getAuthDecode } from '../../Assets/js/Authentication';
import Swal from 'sweetalert2';

const ActivityService = new ActivityProvider();

const AddActivityForm = ({closeForm, activityType, icon}) => {
    const [activityName, setActivityName] = useState('');
    const [isNameOk, setIsNameOk] = useState(false);
    const [activityDescription, setActivityDescription] = useState('');
    const [isDescriptionOk, setIsDescriptionOk] = useState(false);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [isTimeOk, setIsTimeOk] = useState(false);
    const [startTimer, setStartTimer] = useState(false);
    const [timerText, setTimerText] = useState('');
    const [intervalID, setIntervalID] = useState(null);


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
        } else if (time <= 0) {
            setIsTimeOk(true);
            document.getElementById("submit").disabled = true;
        } else {
            setIsTimeOk(false);
            document.getElementById("submit").disabled = false;
        }
    }, [time])

    let S1 = 0;
    let S2 = 0;
    let M = 0;

    const countTime = () => {
        S1++;
        if (S1 === 10) {
            S1 = 0;
            S2++;
            if (S2 === 6) {
                S2 = 0;
                M++;
            }
        }
        setTime(`${M}.${S2}${S1}`);
    } 

    const start = () => {
        setStartTimer(true);
    }

    const stop = () => {
        setStartTimer(false);
    }

    useEffect (() => {
        if (startTimer) {
            setTimerText('Stop Timer');
            setIntervalID(setInterval(countTime, 1000)) ;
        }

        if (!startTimer) {
            setTimerText('Start Timer');
            setIntervalID(clearInterval(intervalID))
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startTimer])

    const onSubmit = async (event) => {
        setIntervalID(clearInterval(intervalID))
        try {
            const { id } = getAuthDecode();

            const payload = {
                userId: id,
                activityType,
                icon,
                activityName,
                activityDescription,
                date,
                duration: +time
            }

            event.preventDefault();
            const { data } = await ActivityService.createActivity(payload); 
            if (data) {
                closeForm();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Activity recorded',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Something wrong',
                text: error.message,
            });
        }
    }

    return (
        <div id="add-activity-form">
            <form action="#" className="form-container" onSubmit={onSubmit}>
                <h3>Record Activity</h3>
                
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
                    {isTimeOk && <div className="error-text">Duration should be positive number</div>}
                </div>
                
                <button id="submit" type="submit" className="btn">Record</button>
                <button type="button" 
                        className={startTimer ? "stop" : "start"}
                        onClick={startTimer ? stop : start}>{timerText}</button>
                <button type="button" className="btn cancel" 
                        onClick={() => {
                            closeForm();
                            setIntervalID(clearInterval(intervalID))
                        }}>Close</button>

            </form>
        </div>
    );
}

export default AddActivityForm;