import '../assets/Login.css'


const ForgotPassword=()=>{

    return(
        <div className='container'>
            <div className="header">
                <div className="text">Reset Password</div>
                <div className="sub-text">Create an account to unlock exclusive features</div>
            </div>
            <div className='inputs'>
                <div className='aboveIntput'>New Password</div>
                <div className="input">
                    <div className='placeholder'>
                        <input type="password" placeholder='Enter your Password' />
                    </div>
                </div>
            </div>
            <div className='inputs'>
                <div className='aboveIntput'>Confirm New Password</div>
                <div className="input">
                    <div className='placeholder'>
                        <input type="password" placeholder='Enter your Password' />
                    </div>
                </div>
            </div>
            <div className="submit-container">
                <div className="submit">Reset Password</div>
            </div>
        </div>
    )
}

export default ForgotPassword;