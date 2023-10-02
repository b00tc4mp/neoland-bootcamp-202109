import './index.css'

const Landing = ({ goToRegister, goToLogin }) => {
    return <>
        <div className='background'>
            <h1 className='landing__title'>Haakon</h1>
            <p className='landing__description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores sapiente earum, alias doloremque perspiciatis quia eveniet quis deleniti officia possimus, illum omnis distinctio non aliquid voluptas officiis magnam necessitatibus ratione?</p>
            <button className='btn landing__btn' type="button" onClick={() => goToRegister()}>Register</button>
            <button className='btn landing__btn' type="button" onClick={() => goToLogin()}>Login</button>
        </div>
    </>
}

export default Landing