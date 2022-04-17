import { useState, useEffect } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import MainBoard from '../../Components/MainBoard/MainBoard';
import RecordBar from '../../Components/RecordBar/RecordBar';
import Footer from '../../Components/Footer/Footer';
import QuickLink from '../../Components/QuickLink/QuickLink';
import Loader from '../../Components/Loader/Loader';

const Home = () => {
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
            <MainBoard title="Exerack" background="home">Your activity tracker</MainBoard>
            <RecordBar />
            <QuickLink />
            <Footer>© EXERACK 2022</Footer>
            {showLoader && <Loader />}
        </>
    );
}

export default Home;