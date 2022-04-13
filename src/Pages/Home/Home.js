import './Home.css';
import NavBar from '../../Components/NavBar/NavBar';
import MainBoard from '../../Components/MainBoard/MainBoard';
import RecordBar from '../../Components/RecordBar/RecordBar';
import Footer from '../../Components/Footer/Footer';
import AddActivityButton from '../../Components/AddActivityButton/AddActivityButton';

const Home = () => {
    return (
        <>
            <NavBar />
            <MainBoard title="Exerack" background="home">Your activity tracker</MainBoard>
            <RecordBar />
            <AddActivityButton />
            <Footer>© EXERACK 2022</Footer>
        </>
    );
}

export default Home;