import './QuickLink.css';
import { useNavigate } from 'react-router-dom';

const QuickLink = () => {
    const navigate = useNavigate();

    const handleClickActivity = () => {
        navigate('/activities', { replace: true });
        setTimeout (() => {
            window.scrollTo(0, 760);
        }, 100)
    }

    const handleClickTable = () => {
        navigate('/home', { replace: true });
        setTimeout (() => {
            window.scrollTo(0, 1120);
        }, 100)
    }

    return (
        <>
        <div className='quick-link-add' onClick={handleClickActivity}>
            <div className='plus-sign'>
                +
            </div>
        </div>
        <div className='quick-link-table' onClick={handleClickTable}>
            <div className='table-sign'>
                <i className="fa-solid fa-table-list"></i>
            </div>
        </div>
        </>
    );
}

export default QuickLink;