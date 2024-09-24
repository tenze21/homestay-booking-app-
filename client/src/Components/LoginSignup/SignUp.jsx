import React from 'react';
import './Login.css'

//images
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import phone_icon from '../Assets/phone.png'
import gender_icon from '../Assets/gender.png'
import country_icon from '../Assets/country.png'
import district_icon from '../Assets/district.png'

const SignUp=()=>{

    return(
        <div className='container'>
            <div className="header">
                <div className="text">Sign Up</div>
                <div className="sub-text">Create an account to unlock exclusive features</div>
            </div>
            <div className='inputs'>
                <div className='aboveIntput'>Full Name</div>
                <div className="input">
                    <img src={user_icon} alt="" srcset="" />
                    <div className='placeholder'>
                        <input type="text" placeholder='Enter your Name' />
                    </div>
                </div>
            </div>
            <div className='inputs'>
                <div className='aboveIntput'>Email</div>
                <div className="input">
                    <img src={email_icon} alt="" srcset="" />
                    <div className='placeholder'>
                        <input type="email" placeholder='Enter your Email' />
                    </div>
                </div>
            </div>
            <div className='inputs'>
                <div className='aboveIntput'>Contact Number</div>
                <div className="input">
                    <img src={phone_icon} alt="" srcset="" />
                    <div className='placeholder'>
                        <input type="text" placeholder='Enter your Number' />
                    </div>
                </div>
            </div>
            <div className='inputs'>
                <div className='aboveIntput'>Gender</div>
                <div className="input">
                    <img src={gender_icon} alt="" srcset="" />
                    <div className='placeholder'>
                        <form id="genderForm">
                            <label for="gender"></label>
                            <select className='genderForm' id="gender" name="gender">
                                <option value="">Pick a gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="non-binary">Non-binary</option>
                                <option value="prefer-not-to-say">Prefer not to say</option>
                                <option value="other">Other</option>
                            </select>
                        </form>
                    </div>
                </div>
            </div>
            <div className='inputs'>
                <div className='aboveIntput'>Country</div>
                <div className="input">
                    <img src={country_icon} alt="" srcset="" />
                    <div className='placeholder'>
                        <input type="text" placeholder='Enter your Country' />
                    </div>
                </div>
            </div>
            <div className='inputs'>
                <div className='aboveIntput'>State</div>
                <div className="input">
                    <img src={district_icon} alt="" srcset="" />
                    <div className='placeholder'>
                        <input type="text" placeholder='Enter your State' />
                    </div>
                </div>
            </div>
            <div className='inputs'>
                <div className='aboveIntput'>Password</div>
                <div className="input">
                    <img src={password_icon} alt="" srcset="" />
                    <div className='placeholder'>
                        <input type="password" placeholder='Enter your password' />
                    </div>
                </div>
            </div>
            <div className='inputs'>
                <div className='aboveIntput'>Confirm Password</div>
                <div className="input">
                    <img src={password_icon} alt="" srcset="" />
                    <div className='placeholder'>
                        <input type="password" placeholder='Enter your password' />
                    </div>
                </div>
            </div>
            <div className="submit-container">
                <div className="submit">Log In</div>
            </div>
            <div className="no-account">Already have an account? <span>Login</span></div>
        </div>
    )
}

export default SignUp;