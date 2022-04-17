import './Activities.css';
import { useState, useEffect } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import MainBoard from '../../Components/MainBoard/MainBoard';
import ActivityList from '../../Components/ActivityList/ActivityList';
import Footer from '../../Components/Footer/Footer';
import QuickLink from '../../Components/QuickLink/QuickLink';
import Loader from '../../Components/Loader/Loader';

const Activities = () => {
    const [showLoader, setShowLoader] = useState(false);

    useEffect (() => {
        setShowLoader(true);
        setTimeout (() => {
            setShowLoader(false);
        }, 1000)
    }, [])

    return (
        <>
            <NavBar />
            <MainBoard title="Record" background="activities">Your new activity</MainBoard>
            <ActivityList />
            <QuickLink />
            <Footer>© EXERACK 2022</Footer>
            {showLoader && <Loader />}
        </>
    );
}

export default Activities;