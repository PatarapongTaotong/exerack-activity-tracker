import './RecordBar.css';
import { useEffect, useState } from 'react';
import RecordResults from '../RecordResults/RecordResults';
import Button from '../Button/Button';
import { getAuthDecode } from '../../Assets/js/Authentication';
import ActivityProvider from '../../Resources/ActivityProvider';
import EditActivityForm from '../EditAcitivityForm/EditActivityForm';

const ActivityService = new ActivityProvider();

const RecordBar = () => {
    const [recordData, setRecordData] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [editData, setEditData] = useState({});

    const fetchActivities = async () => {
        try {
            const { id } = getAuthDecode();
            const { data } = await ActivityService.getActivitiesByUserId(id);
            setRecordData(data);
        } catch (error) {
            console.log(error)
        }    
    }

    useEffect(() => {
        fetchActivities();
    }, [])

    const onClickRecord = (record) => {
        setEditData(record);
        setShowEdit(true);
    }

    return (
        <div className="container section">
            <div>
                <h2 className="section-title">Hi Rowan Row, welcome to Exerack</h2>
            </div>
            <div className="avatar-container">
                <div className="avatar">
                    <img src="./Images/avatar.png" alt="Profile" className="avatar-image" />
                </div>
            </div>
            <div className="home-main-section">
                <RecordResults recordData={recordData} onClickRecord={onClickRecord} />
                <Button link='/history'>View all records</Button>
            </div>
            {showEdit && <EditActivityForm editData={editData} 
                                            closeForm={() => setShowEdit(false)} 
                                            activityType={editData.activityType} 
                                            icon={editData.icon}
                                            onEdit={() => fetchActivities()} />}
        </div>
    );
}

export default RecordBar;