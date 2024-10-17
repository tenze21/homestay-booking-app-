import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_ ]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const CONTACT_REGEX = /^[0-9+() -]{7,15}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [gender, setGender] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');

    const [contact, setContact] = useState('');
    const [validContact, setValidContact] = useState(false);
    const [contactFocus, setContactFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setValidContact(CONTACT_REGEX.test(contact));
    }, [contact])

    useEffect(() => {
        setErrMsg('');
    }, [user, email, pwd, matchPwd, contact])

    

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <p className="toSignIn belowregis">Create an account to Unlock exclusive features</p>
                    <form>
                        <div className="rows">
                            <div className="col">
                                {/* Username */}
                                <label htmlFor="username">
                                    Full Name
                                    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                                </label>
                                <input
                                    className="inputs"
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                    aria-invalid={validName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                />
                                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    4 to 24 characters. Must begin with a letter.<br />
                                    Letters, numbers, underscores, hyphens, spaces allowed.
                                </p>
                            </div>
                            <div className="col">
                                {/* Email */}
                                <label htmlFor="email">
                                    Email
                                    <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                                </label>
                                <input
                                    className="inputs"
                                    type="email"
                                    id="email"
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="emailnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                                <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Enter a valid email address.
                                </p>
                            </div>
                            
                        </div>
                        <div className="rows">
                            <div className="col">
                                {/* Contact */}
                                <label htmlFor="contact">
                                    Contact Info
                                    <FontAwesomeIcon icon={faCheck} className={validContact ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validContact || !contact ? "hide" : "invalid"} />
                                </label>
                                <input
                                    className="inputs"
                                    type="text"
                                    id="contact"
                                    autoComplete="off"
                                    onChange={(e) => setContact(e.target.value)}
                                    value={contact}
                                    required
                                    aria-invalid={validContact ? "false" : "true"}
                                    aria-describedby="contactnote"
                                    onFocus={() => setContactFocus(true)}
                                    onBlur={() => setContactFocus(false)}
                                />
                                <p id="contactnote" className={contactFocus && !validContact ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Enter a valid contact number (7-15 digits, +, -, (), space allowed).
                                </p>
                            </div>
                            <div className="col">
                                {/* Gender */}
                                <label htmlFor="gender">
                                    Gender
                                </label>
                                <select className="inputs" id="gender" onChange={(e) => setGender(e.target.value)} value={gender} required>
                                    <option value=""></option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="rows">
                            <div className="col">
                                {/* Country */}
                                <label htmlFor="country">
                                    Country
                                </label>
                                <input
                                    className="inputs"
                                    type="text"
                                    id="country"
                                    autoComplete="off"
                                    onChange={(e) => setCountry(e.target.value)}
                                    value={country}
                                    required
                                />
                            </div>
                            <div className="col">
                                {/* State */}
                                <label htmlFor="state">
                                    State
                                </label>
                                <input
                                    className="inputs"
                                    type="text"
                                    id="state"
                                    autoComplete="off"
                                    onChange={(e) => setState(e.target.value)}
                                    value={state}
                                    required
                                />
                            </div>
                        </div>
                        <div className="rows">
                            <div className="col">
                                {/* Password */}
                                <label htmlFor="password">
                                    Password
                                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                                </label>
                                <input
                                    className="inputs"
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    8 to 24 characters. Must include uppercase, lowercase, number, and special character.
                                </p>
                            </div>
                            <div className="col">
                                {/* Confirm Password */}
                                <label htmlFor="confirm_pwd">
                                    Confirm Password
                                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                                </label>
                                <input
                                    className="inputs"
                                    type="password"
                                    id="confirm_pwd"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Must match the first password input.
                                </p>
                            </div>                            
                        </div>
                        {/* Submit */}
                        <button disabled={!validName || !validPwd || !validMatch || !validEmail || !validContact ? true : false}>Sign Up</button>
                    </form>
                    <p className="toSignIn">
                        Already registered? 
                        <span className="line">
                            <a className="signIn" href="#">Log In</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Register;
