import './Activities.css';
import NavBar from '../../Components/NavBar/NavBar';
import MainBoard from '../../Components/MainBoard/MainBoard';
import ActivityList from '../../Components/ActivityList/ActivityList';
import Footer from '../../Components/Footer/Footer';
import QuickLink from '../../Components/QuickLink/QuickLink';

const Activities = () => {
    return (
        <>
            <NavBar />
            <MainBoard title="Record" background="activities">Your new activity</MainBoard>
            <ActivityList />
            <QuickLink />
            <Footer>© EXERACK 2022</Footer>
        </>
    );
}

export default Activities;