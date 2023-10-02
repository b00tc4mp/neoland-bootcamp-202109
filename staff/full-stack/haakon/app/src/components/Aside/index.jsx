import './index.css'

const Aside = ({ hideAside, goToProfileLibrary, goToProfileSettings, resetTokenAndGoToLanding }) => {
    return <>
        <aside className='aside'>
            <nav className='aside__nav'>
                <i className="fas fa-times xIcon" onClick={() => hideAside()}></i>
                <ul className='nav__list'>
                    <li className='list__item' onClick={() => goToProfileLibrary()}><i className="fas fa-book-reader"></i>  My Library</li>
                    <li className='list__item' onClick={() => goToProfileSettings()}><i className="fas fa-user-alt"></i>  My Profile</li>
                    <li className='list__item' onClick={() => resetTokenAndGoToLanding()}><i className="fas fa-sign-out-alt"></i> Go out</li>
                </ul>
            </nav>
        </aside>
    </>
}

export default Aside