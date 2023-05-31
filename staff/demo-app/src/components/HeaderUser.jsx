function HeaderUser({ myUserName, onProfile, onLogOut }) {
    return (
        <div className="headerUser">
            <div className="selfie"><img className="selfie__img" src="https://placeimg.com/100/100/animals" alt="" /></div>
            <div className="userInfo">
                <div className="userInfo__box-1">
                    <p className="box-1__user"><span className="user__span">{myUserName}</span></p>
                    <button className="box-1__btn-edit" type="button" onClick={() => onProfile()}>Profile</button>
                    <button className="box-1__btn-edit" type="button" onClick={() => onLogOut()}>Log Out</button>
                    {/* <button className="box-1__btn-settings" type="button"><img src="https://img.icons8.com/material-rounded/24/000000/settings.png" /></button> */}
                </div>
                <div className="userInfo__box-2">
                    <p className="box-2__posts"><span className="post__span">164</span> post</p>
                    <p className="box-2--followers"><span className="followers__span">188</span> followers</p>
                    <p className="box-2__following"><span className="following__span">206</span> following</p></div>
                <div className="userInfo__box-3"><p className="box-3__description">{myUserName} Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit error quibusdam amet ducimus veritatis tenetur explicabo similique modi, eius architecto asperiores voluptatum ea non commodi cupiditate mollitia blanditiis deleniti laudantium. ✈🏝🕌</p></div>
            </div>
        </div>
    )
}

export default HeaderUser