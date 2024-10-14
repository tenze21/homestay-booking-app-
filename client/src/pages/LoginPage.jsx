import '../assets/styles/Login.css'



const Login=()=>{

    return(
        <div className='container'>
            <div className="header">
                <div className="text">Login</div>
                <div className="sub-text">Welcome back! Please log in to access your account.</div>
            </div>
            
            <div className='inputs'>
                <div className='aboveIntput'>Email</div>
                <div className="input">
                    <div className='placeholder'>
                        <input type="email" placeholder='Enter your Email' />
                    </div>
                </div>
            </div>
            <div className='inputs'>
                <div className='aboveIntput'>Password</div>
                <div className="input">
                    <div className='placeholder'>
                        <input type="password" placeholder='Enter your Password' />
                    </div>
                </div>
            </div>
            <div className="forgot-password">Forgot password? <span>Click Here!</span></div>
            <div className="submit-container">
                <div className="submit">Log In</div>
            </div>
            <div className="no-account">Don&apos;t have an account? <span>Sign Up</span></div>
        </div>
    )
}

export default Login;