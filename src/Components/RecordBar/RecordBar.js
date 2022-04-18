import './RecordBar.css';
import { useEffect, useState } from 'react';
import RecordResults from '../RecordResults/RecordResults';
import { getAuthDecode } from '../../Assets/js/Authentication';
import ActivityProvider from '../../Resources/ActivityProvider';
import UserProvider from '../../Resources/UserProvider';
import EditActivityForm from '../EditAcitivityForm/EditActivityForm';
import Swal from 'sweetalert2';
import Loader from '../../Components/Loader/Loader';

const ActivityService = new ActivityProvider();
const UserService = new UserProvider();

const RecordBar = () => {
    const [recordData, setRecordData] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [editData, setEditData] = useState({});
    const [name, setName] = useState('');
    const [typeSelected, setTypeSelected] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    let [currentPage, setCurrentPage] = useState(1);
    let [totalPages, setTotalPages] = useState(null);
    let [startRecordsInfo, setStartRecordsInfo] = useState(null);
    let [endRecordsInfo, setEndRecordsInfo] = useState(null);
    const [recordsInfo, setRecordsInfo] = useState(null);
    const [profileImage, setProfileImage] = useState('./Images/avatar.png');
    const [showLoader, setShowLoader] = useState(false);

    const fetchActivities = async () => {
        try {
            setShowLoader(true);
            const { id } = getAuthDecode();
            const query = {
                limit: 20,
                sort: 'date',
                sortOrder: 'desc',
                page: currentPage,
                types: typeSelected
            }

            const { data } = await ActivityService.getActivitiesByUserId(id, query);
            setRecordData(data.docs);
            setNextPage(data.hasNextPage);
            setPrevPage(data.hasPrevPage);
            setTotalPages(data.totalPages);

            if (data.totalDocs === 0) {
                setRecordsInfo('no record')
            }

            if (data.totalDocs === 1) {
                setRecordsInfo('1 record')
            }

            if (data.totalDocs > 1) {
                setStartRecordsInfo(((data.page - 1) * 20) + 1);
                setEndRecordsInfo(((data.page - 1) * 20) + data.docs.length);  
            }

            if (data) {
                setShowLoader(false);
            }

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
            setProfileImage(data.imgUrl);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Something wrong',
                text: error.message,
            });
        }  
    }

    useEffect(() => {
        getUsername();
    }, [])

    useEffect(() => {
        fetchActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeSelected, currentPage, endRecordsInfo])

    useEffect(() => {
        setRecordsInfo(`${startRecordsInfo}-${endRecordsInfo} of records`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endRecordsInfo])

    const onClickRecord = (record) => {
        setEditData(record);
        setShowEdit(true);
    }

    const onSelectType = (type) => {
       if (type !== 'Show all') {
           setTypeSelected([type]);
       }

       if (type === 'Show all') {
            setTypeSelected([]);
       }
    }

    const previous = () => {
        if (currentPage > 1) {
            setCurrentPage(--currentPage);
        }
    }

    const next = () => {
        if (currentPage < totalPages) {
            setCurrentPage(++currentPage);
        }
    }

    return (
        <div className="container section">
            <div>
                <h2 className="section-title">Hi {name}, welcome to Exerack</h2>
            </div>
            <div className="avatar-container">
                <div className="avatar">
                    <img src={profileImage} alt="Profile" className="avatar" />
                </div>
            </div>
            <div className="home-main-section">
                <RecordResults recordData={recordData} onClickRecord={onClickRecord} onSelectType={onSelectType} />
                <div className="page">
                    <div className={prevPage ? 'previous' : 'disabled-prev'} onClick={previous}>
                        <i className="fa-solid fa-square-caret-left"></i>
                    </div>
                    <div className="page-information">
                        {recordsInfo}
                    </div>
                    <div className={nextPage ? 'next' : 'disabled-next'} onClick={next}>
                        <i className="fa-solid fa-square-caret-right"></i>
                    </div>
                </div>
            </div>
            {showEdit && <EditActivityForm editData={editData} 
                                            closeForm={() => setShowEdit(false)} 
                                            activityType={editData.activityType} 
                                            icon={editData.icon}
                                            onEdit={() => fetchActivities()} />}
            {showLoader && <Loader />}
        </div>
    );
}

export default RecordBar;