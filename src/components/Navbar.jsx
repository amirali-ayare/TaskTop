import { Link } from 'react-router-dom';
import '../app.css';
import '../easy.css';

export const Navbar = ()=>{
    return(
        <div className="navbar w-100 d-flex ai-center ju-bet p-20 bac-green white" style={{height:'70px'}}>
            <div className='d-flex ai-center fw-300'>
            </div>

            <h2 className='purple fw-800'>تسک تاپ</h2>

            <div className='d-flex ai-center relative'>
                <Link className='dec-none' to={'/notif'}><button className='navbar-btn ml-10'><i class='bx bx-bell'></i></button></Link>
                <Link className='dec-none' to={'/help'}><button className='navbar-btn'><i class='bx bx-question-mark'></i></button></Link>
            </div>
        </div>
    )
}