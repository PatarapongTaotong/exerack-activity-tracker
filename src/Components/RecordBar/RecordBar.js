import './RecordBar.css';
import { useEffect, useState } from 'react';
import RecordResults from '../RecordResults/RecordResults';
import Button from '../Button/Button';
import { getAuthDecode } from '../../Assets/js/Authentication';
import ActivityProvider from '../../Resources/ActivityProvider';
import UserProvider from '../../Resources/UserProvider';
import EditActivityForm from '../EditAcitivityForm/EditActivityForm';
import Swal from 'sweetalert2';

const ActivityService = new ActivityProvider();
const UserService = new UserProvider();

const RecordBar = () => {
    const [recordData, setRecordData] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [editData, setEditData] = useState({});
    const [name, setName] = useState('');

    const fetchActivities = async () => {
        try {
            const { id } = getAuthDecode();
            const { data } = await ActivityService.getActivitiesByUserId(id, 20);
            setRecordData(data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Something wrong',
                text: error.message,
            });
        }    
    }

    const getUsername = async () => {
        try {
            const { id } = getAuthDecode();
            const { data } = await UserService.getUserById(id);
            setName(data.username);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Something wrong',
                text: error.message,
            });
        }  
    }

    useEffect(() => {
        fetchActivities();
        getUsername();
    }, [])

    const onClickRecord = (record) => {
        setEditData(record);
        setShowEdit(true);
    }

    return (
        <div className="container section">
            <div>
                <h2 className="section-title">Hi {name}, welcome to Exerack</h2>
            </div>
            <div className="avatar-container">
                <div className="avatar">
                    <img src="./Images/avatar.png" alt="Profile" className="avatar-image" />
                </div>
            </div>
            <div className="home-main-section">
                <RecordResults recordData={recordData} onClickRecord={onClickRecord} />
                <Button link='/history'>View more records</Button>
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