import notif from '../images/8093351.webp';

export const Notification = () => {
    return (
        <div className="w-100 h-100 overflow bg white d-flex column ai-center">
            <div className="w-100 p-20 d-flex ai-center ju-center">
                <h1>اعلان ها</h1>
            </div>

            <div className="w-100 p-20 d-flex ai-center ju-center column">
                <img src={notif} className='w-10' />
                <h4 className='fw-200'>هیچ اعلانی وجود ندارد . . .</h4>
            </div>
        </div>
    )
}