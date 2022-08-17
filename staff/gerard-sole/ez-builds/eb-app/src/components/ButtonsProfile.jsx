function ButtonsProfile(props) {
    return <>
        <div className="container contaienr--vertical">
            <button className="button button--dark" onClick={() => props.goPassword()}>Change password</button>
            <button className="button" onClick={() => props.goDeleteUser()}>Delete account</button>
        </div> 
    </>
} 
export default ButtonsProfile