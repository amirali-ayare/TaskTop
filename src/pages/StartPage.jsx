import { Link } from 'react-router-dom'
import vector from '../images/vector.png'

export const StartPage = () => {
    return(
        <div style={{backgroundColor:'#15161a'}} className="w-100 h-100 d-flex ai-center">
            
            <div className='w-50 d-flex p-20 column white' style={{paddingRight:'80px'}}>
                <h1>خوش آمدید به <span className='purple bold'>تسک تاپ</span></h1>
                <h4 className='fw-200 mt-10'>سیستم مدیریت تسک ها و برنامه ریزی با شیوه ای متفاوت</h4>
                <Link className='dec-none' to={'/signup'}><button className='start-btn'>
                    شروع
                    <i class='bx bx-chevrons-left'></i>
                </button></Link>
            </div>

            <div className='w-50 d-flex p-20 column ai-center'>
                <img src={vector} className='w-70'/>
            </div>

        </div>
    )
}