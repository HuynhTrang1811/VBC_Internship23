const UserImg = () => {
    return (
        <>
<div className="app-user">
            <div className="app-user-img">
                <div className="app-user-bg-img">
                    <img id="bg-img" src="https://i.seadn.io/gcs/files/2c27f83e14d1a9c59763355e5337ce6e.jpg?auto=format&dpr=1&w=1920" />
                </div>
                <div className="app-user-avt-img">
                    <img  id="avt-img" src="https://i.seadn.io/gcs/files/d0b736cebabd12dd7837511e88bfcf43.jpg?auto=format&dpr=1&w=256" />
                </div>


                {/* <div className="app-user-avatar">
                   
                </div> */}
            </div>
            <div className="app-user-infor">
      <img id="eth-img" src="https://i.pinimg.com/564x/1b/9f/c2/1b9fc2f3a48868013b251accf905c205.jpg" />
      <h5 className='inf-address'>0xF37727847385</h5>
    </div>
    </div>
            
           



        </>
    )

}
export default UserImg;