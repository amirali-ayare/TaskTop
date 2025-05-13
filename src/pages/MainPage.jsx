// import { useContext } from 'react';
// import { ProfileContext } from '../App';
// import '../App.css';
// import '../easy.css';
import { Sidebar } from '../components/Sidebar';
import { Main } from '../components/Main';

export const Mainpage = () => {
    // const { state, dispatch } = useContext(ProfileContext);
    return(
        <div className='d-flex w-100'>
            <Sidebar />
            <Main />
        </div>
    )
}