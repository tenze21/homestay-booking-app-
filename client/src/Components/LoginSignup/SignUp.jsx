import React from 'react';
import './Login.css'

import side_image from '../Assets/sideimage.png'

const SignUp=()=>{

    return(
        <div className='outter-container'>
            <div className='signup-container'>
                <div className="header">
                    <div className="text">Sign Up</div>
                    <div className="sub-text">Create an account to unlock exclusive features</div>
                </div>
                <div className='below-header'>
                    <div className='separated'>
                        <div className='inputs'>
                            <div className='signup-aboveIntput'>Full Name</div>
                            <div className="input">
                                <div className='placeholder'>
                                    <input type="text" placeholder='Enter your Name' />
                                </div>
                            </div>
                        </div>
                        <div className='inputs'>
                            <div className='signup-aboveIntput'>Email</div>
                            <div className="input">
                                <div className='placeholder'>
                                    <input type="email" placeholder='Enter your Email' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="separated">
                        <div className='inputs'>
                            <div className='signup-aboveIntput'>Contact Number</div>
                            <div className="input">
                                <div className='placeholder'>
                                    <input type="text" placeholder='Enter your Number' />
                                </div>
                            </div>
                        </div>
                        <div className='inputs'>
                            <div className='signup-aboveIntput'>Gender</div>
                            <div className="input">
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
                    </div>
                    <div className="separated">
                        <div className='inputs'>
                            <div className='signup-aboveIntput'>Country</div>
                            <div className="input">
                                <div className='placeholder'>
                                    <input type="text" placeholder='Enter your Country' />
                                </div>
                            </div>
                        </div>
                        <div className='inputs'>
                            <div className='signup-aboveIntput'>State</div>
                            <div className="input">
                                <div className='placeholder'>
                                    <input type="text" placeholder='Enter your State' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="separated">
                        <div className='inputs'>
                            <div className='signup-aboveIntput'>Password</div>
                            <div className="input">
                                <div className='placeholder'>
                                    <input type="password" placeholder='Enter your password' />
                                </div>
                            </div>
                        </div>
                        <div className='inputs'>
                            <div className='signup-aboveIntput'>Confirm Password</div>
                            <div className="input">
                                <div className='placeholder'>
                                    <input type="password" placeholder='Enter your password' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="submit-container">
                        <div className="submit">Log In</div>
                    </div>
                    <div className="no-account">Already have an account? <span>Login</span></div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;