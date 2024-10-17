import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ForgotPassword = () => {
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [newPwd, setNewPwd] = useState('');
    const [validNewPwd, setValidNewPwd] = useState(false);
    const [newPwdFocus, setNewPwdFocus] = useState(false);

    const [confirmPwd, setConfirmPwd] = useState('');
    const [validConfirmPwd, setValidConfirmPwd] = useState(false);
    const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidNewPwd(PWD_REGEX.test(newPwd));
        setValidConfirmPwd(newPwd === confirmPwd);
    }, [newPwd, confirmPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, newPwd, confirmPwd])

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>Your password has been reset. <a href="#">Log In</a></p>
                </section>
            ) : (
                <section className="small-width">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Reset Password</h1>
                    <form className="forgot-form">
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
                        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Please enter a valid email address.
                        </p>

                        {/* New Password */}
                        <label htmlFor="newpassword">
                            New Password
                            <FontAwesomeIcon icon={faCheck} className={validNewPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validNewPwd || !newPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            className="inputs"
                            type="password"
                            autoComplete="off"
                            id="newpassword"
                            onChange={(e) => setNewPwd(e.target.value)}
                            value={newPwd}
                            required
                            aria-invalid={validNewPwd ? "false" : "true"}
                            aria-describedby="newpwdnote"
                            onFocus={() => setNewPwdFocus(true)}
                            onBlur={() => setNewPwdFocus(false)}
                        />
                        <p id="newpwdnote" className={newPwdFocus && !validNewPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters. Must include uppercase and lowercase letters, a number, and a special character.
                        </p>

                        {/* Confirm Password */}
                        <label htmlFor="confirm_pwd">
                            Confirm Password
                            <FontAwesomeIcon icon={faCheck} className={validConfirmPwd && confirmPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validConfirmPwd || !confirmPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            className="inputs"
                            type="password"
                            id="confirm_pwd"
                            autoComplete="off"
                            onChange={(e) => setConfirmPwd(e.target.value)}
                            value={confirmPwd}
                            required
                            aria-invalid={validConfirmPwd ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setConfirmPwdFocus(true)}
                            onBlur={() => setConfirmPwdFocus(false)}
                        />
                        <p id="confirmnote" className={confirmPwdFocus && !validConfirmPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the new password.
                        </p>

                        {/* Submit Button */}
                        <button disabled={!validEmail || !validNewPwd || !validConfirmPwd ? true : false}>Reset Password</button>
                    </form>
                </section>
            )}
        </>
    )
}

export default ForgotPassword;
