import './AddActivityButton.css';
import { Link } from 'react-router-dom';

const AddActivityButton = () => {
    return (
        <div className='quick-link'>
            <Link to='/activities' className='plus-sign'>
                +
            </Link>
        </div>
    );
}

export default AddActivityButton;