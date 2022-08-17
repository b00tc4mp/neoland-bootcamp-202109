function PostSignUp( props ) {
    return <div className="screen">
        <div className="post-signup container container--gapped container--vertical">
            User registered successfully, now you can proceed to <button className="button button--dark button--medium" onClick={() => props.onSignIn()}>Sign
                in</button>
        </div>
    </div>
}
export default PostSignUp