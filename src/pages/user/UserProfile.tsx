import "./User.css"
const UserProfile = () => {
    return (
        <>
            <div className="app-user">
                <div className="app-user-img">
                    <div className="app-user-bg-img">
                        <img id="bg-img" src="" />
                    </div>
                    <div className="app-user-avt-img">
                        <img id="avt-img" src="https://i.seadn.io/gcs/files/7ed181433ee09174f09a0e31b563d313.png?auto=format&dpr=1&w=256" />
                    </div>


                    {/* <div className="app-user-avatar">
                   
                </div> */}
                </div>
                <div className="app-user-infor">
                    <img id="eth-img" src="https://i.pinimg.com/564x/1b/9f/c2/1b9fc2f3a48868013b251accf905c205.jpg" />
                    <h3 className='inf-address'>0xF37727847385</h3>
                </div>
            </div>





        </>
    )

}
export default UserProfile;