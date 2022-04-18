import NavBar from '../../Components/NavBar/NavBar';
import MainBoard from '../../Components/MainBoard/MainBoard';
import RecordBar from '../../Components/RecordBar/RecordBar';
import Footer from '../../Components/Footer/Footer';
import QuickLink from '../../Components/QuickLink/QuickLink';

const Home = () => {

    return (
        <>
            <NavBar />
            <MainBoard title="Exerack" background="home">Your activity tracker</MainBoard>
            <RecordBar />
            <QuickLink />
            <Footer>© EXERACK 2022</Footer>
        </>
    );
}

export default Home;