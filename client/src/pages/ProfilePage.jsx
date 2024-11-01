import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/styles/profile.css";
import {
  Row,
  Col,
  ListGroup,
  Form,
  Image,
  Button,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CountriesList from "../components/CountriesList";
import StatesList from "../components/StatesList";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetUserDetailsQuery,
  useUpdateUserDetailMutation,
  useUpdateHostDetailMutation,
  useUpdateProfileMutation,
} from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import ProfileSidebar from "../components/ProfileSidebar";

function ProfilePage() {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: user,
    refetch,
    isLoading,
    error,
  } = useGetUserDetailsQuery(userInfo._id);
  const [updateUser, { isLoading: isLoadingUpdate }] =
    useUpdateUserDetailMutation();
  const [updateHost, { isLoading: isLoadingUpdateHost }] =
    useUpdateHostDetailMutation();

  const [updateProfile, {isLoading: loadingUpload}] = useUpdateProfileMutation();

  const [fullName, setFullName] = useState("");
  const [profile, setProfile] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState();
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [userState, setUserState] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const [spokenLanguages, setSpokenLanguages] = useState([]);
  const [profession, setProfession] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [accountNumber, setAccountNumber] = useState();
  const [accountHolderName, setAccountHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [bio, setBio] = useState("");
  const [focus, setFocus] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFullName(user.full_name);
      setProfile(user.profile);
      setEmail(user.email);
      setContactNumber(user.contact_number);
      setUserState(user.region);
      setUserCountry(user.country);
      setGender(user.gender);
      setEducation(user.education);
      setSpokenLanguages(user.spoken_languages);
      setProfession(user.profession);
      setDateOfBirth(user.date_of_birth);
      setAccountNumber(user.account_number);
      setAccountHolderName(user.account_holder_name);
      setBankName(user.bank_name);
      setBio(user.bio);
    }
  }, [user]);

  useEffect(() => {
    var config = {
      method: "get",
      url: `https://api.countrystatecity.in/v1/countries`,
      headers: {
        "X-CSCAPI-KEY":
          "Sk5DQVltWGc2em51U2ZpcFJVT0VJdmxFTng3MkxjT2ZRaXlhMnliSQ==",
      },
    };

    axios(config)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    var config = {
      method: "get",
      url: `https://api.countrystatecity.in/v1/countries/${country.iso2}/states`,
      headers: {
        "X-CSCAPI-KEY":
          "Sk5DQVltWGc2em51U2ZpcFJVT0VJdmxFTng3MkxjT2ZRaXlhMnliSQ==",
      },
    };

    axios(config)
      .then((response) => {
        setStates(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [country]);

  const resetUserHandler = async () => {
    refetch();
    setFullName(user.full_name);
    setEmail(user.email);
    setContactNumber(user.contact_number);
    setUserState(user.region);
    setUserCountry(user.country);
    setGender(user.gender);
  };
  const resetHostHandler = async () => {
    refetch();
    setEducation(user.education);
    setSpokenLanguages(user.spoken_languages);
    setProfession(user.profession);
    setDateOfBirth(user.date_of_birth);
    setAccountNumber(user.account_number);
    setAccountHolderName(user.account_holder_name);
    setBankName(user.bank_name);
    setBio(user.bio);
  };

  const updateUserHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser({userId: {_id: userInfo._id}, data:{
        fullName,
        profile,
        email,
        contactNumber,
        gender,
        country: userCountry,
        region: userState,
      }}).unwrap();
      refetch();
      dispatch(setCredentials({
        ...userInfo,
        fullName: res.fullName,
        profile: res.profile,
        email: res.email,
        contactNumber: res.contactNumber,
        country: res.country,
        region: res.region,
      }));
      toast.success("User details updated successfully.");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const updateHostHandler = async (e) => {
    e.preventDefault();
    try {
      await updateHost({userId: {_id: userInfo._id}, data:{
        education,
        spokenLanguages,
        profession,
        dateOfBirth,
        accountNumber,
        accountHolderName,
        bankName,
        bio,
      }}).unwrap();
      refetch();
      toast.success("Host details updated successfully.");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const profileUpdateHandler= async(e)=>{
    const formData= new FormData();
    formData.append("userId", userInfo._id);
    formData.append("profile", e.target.files[0]);
    try {
      const res= await updateProfile(formData).unwrap();
      toast.success(res.message);
      setProfile(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <Row>
      <Col
        md={2}
        className="border-end position-absolute h-100 top-0 start-0 ps-0 pe-0 pt-5 mb-5"
        style={{ backgroundColor: "white" }}
      >
        <ProfileSidebar/>
      </Col>
      <Col md={10} className="profile-wrapper">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <Form onSubmit={updateUserHandler}>
              <ListGroup variant="flush" className="mt-4">
                <ListGroup.Item style={{ backgroundColor: "transparent" }}>
                  <Image
                    src={profile}
                    className="rounded-circle profile-custom"
                  />
                  <Form.Group controlId="profile">
                    <label htmlFor="profile" className="profile-label">
                      <MdEdit size={32} />
                    </label>
                    <input
                      type="file"
                      name="profile"
                      id="profile"
                      className="d-none"
                      onChange={profileUpdateHandler}
                    />
                  </Form.Group>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush">
                <ListGroup.Item style={{ backgroundColor: "#f5f5f5" }}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="my-3">
                        <Form.Label className="fw-semibold fs-4">
                          Name:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          size="lg"
                          id="name"
                          placeholder="Enter your name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          minLength={3}
                          maxLength={25}
                          required
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group className="my-3">
                        <Form.Label className="fw-semibold fs-4">
                          Contact Number:
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text>+975</InputGroup.Text>
                          <Form.Control
                            type="text"
                            size="lg"
                            id="contact-number"
                            placeholder="Enter your contact number"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            minLength={8}
                            maxLength={8}
                          ></Form.Control>
                        </InputGroup>
                        <small className="custom-inst">
                          Leave blank if you don't have a contact number from a
                          bhutanese internet service provider.
                        </small>
                      </Form.Group>
                      <Form.Group
                        controlId="region"
                        className="my-3 position-relative"
                      >
                        <Form.Label className="fw-semibold fs-4">
                          State or Dzongkhag:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          size="lg"
                          placeholder="Enter your state or dzongkhag"
                          value={userState}
                          onChange={(e) => {
                            setUserState(e.target.value);
                            setShowStateDropdown(true);
                          }}
                          required
                          autoComplete="off"
                          spellCheck="false"
                        ></Form.Control>
                        {showStateDropdown && (
                          <StatesList
                            states={states}
                            state={region}
                            setShowStateDropdown={setShowStateDropdown}
                            setRegion={setRegion}
                            setUserState={setUserState}
                            userState={userState}
                          />
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="my-3">
                        <Form.Label className="fw-semibold fs-4">
                          Email:
                        </Form.Label>
                        <Form.Control
                          type="email"
                          id="email"
                          size="lg"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          minLength={3}
                          maxLength={25}
                          required
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group
                        controlId="country"
                        className="my-3 position-relative"
                      >
                        <Form.Label className="fw-semibold fs-4">
                          Country:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          size="lg"
                          placeholder="Enter your country"
                          value={userCountry}
                          onChange={(e) => {
                            setUserCountry(e.target.value);
                            setShowCountryDropdown(true);
                          }}
                          required
                          autoComplete="off"
                          spellCheck="false"
                          style={{ maxHeight: "300px", overflowY: "scroll" }}
                        ></Form.Control>
                        {showCountryDropdown && (
                          <CountriesList
                            countries={countries}
                            setCountry={setCountry}
                            setShowCountryDropdown={setShowCountryDropdown}
                            country={country}
                            setUserCountry={setUserCountry}
                            userCountry={userCountry}
                          />
                        )}
                      </Form.Group>
                      <Form.Group
                        controlId="contact-number"
                        className="mb-3"
                        style={{ marginTop: "39px" }}
                      >
                        <Form.Label className="fw-semibold fs-4">
                          Gender:
                        </Form.Label>
                        <Form.Select
                          required
                          size="lg"
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option>Select your gender</option>
                          {gender === "Male" ? (
                            <option value="Male" selected>
                              Male
                            </option>
                          ) : (
                            <option value="Male">Male</option>
                          )}
                          {gender === "Female" ? (
                            <option value="Female" selected>
                              Female
                            </option>
                          ) : (
                            <option value="Female">Female</option>
                          )}
                          {gender === "Other" ? (
                            <option value="Other" selected>
                              Other
                            </option>
                          ) : (
                            <option value="Other">Other</option>
                          )}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <div className="d-flex justify-content-end">
                <Button
                  variant="danger"
                  type="button"
                  onClick={resetUserHandler}
                >
                  Discard Changes
                </Button>
                {isLoadingUpdate ? (
                  <Button type="submit" size="lg" className="ms-3" disabled>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </Button>
                ) : (
                  <Button type="submit" variant="success" className="ms-3">
                    Save Changes
                  </Button>
                )}
              </div>
            </Form>
            {user.ishost && (
              <Form onSubmit={updateHostHandler}>
                <ListGroup variant="flush">
                  <ListGroup.Item
                    style={{ backgroundColor: "transparent" }}
                    className="pt-0 pb-0"
                  >
                    <h2>Host Details</h2>
                  </ListGroup.Item>
                  <ListGroup.Item style={{ backgroundColor: "transparent" }}>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="education" className="my-3">
                          <Form.Label className="fw-semibold fs-4">
                            Education:
                          </Form.Label>
                          <Form.Select
                            aria-label="Select your education level"
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                            size="lg"
                          >
                            <option>Education</option>
                            <option value="Primary School">
                              Primary School (Till 6th grade)
                            </option>
                            <option value="Middle School">
                              Middle school (Till 10th grade)
                            </option>
                            <option value="High School">
                              High School (Till 12th grade)
                            </option>
                            <option value="Bachelors Degree">
                              Bachelors Degree
                            </option>
                            <option value="Masters Degree">
                              Masters Degree
                            </option>
                            <option value="phD">phD</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="my-3">
                          <Form.Label className="fw-semibold fs-4">
                            Date of Birth:
                          </Form.Label>
                          <Form.Control
                            type={focus ? "date" : "text"}
                            onFocus={() => setFocus(true)}
                            value={dateOfBirth.split("T")[0]}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            placeholder="Date of Birth"
                            size="lg"
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label className="fw-semibold fs-4">
                            Account Holder Name:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Account holder name"
                            value={accountHolderName}
                            required
                            size="lg"
                            onChange={(e) => {
                              setAccountHolderName(e.target.value);
                            }}
                          />
                        </Form.Group>
                        <Form.Group className="my-3">
                          <Form.Label className="fw-semibold fs-4">
                            Spoken Languages:
                          </Form.Label>
                          <Row>
                            <Col md={6}>
                              <Form.Check
                                label="English"
                                type="checkbox"
                                value={"English"}
                                checked={spokenLanguages.includes("English")}
                                className="d-flex align-items-center checkbox-custom fw-semibold my-3"
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (e.target.checked) {
                                    setSpokenLanguages([
                                      ...spokenLanguages,
                                      value,
                                    ]);
                                  } else {
                                    setSpokenLanguages(
                                      spokenLanguages.filter(
                                        (language) => language !== value
                                      )
                                    );
                                  }
                                }}
                              />
                              <Form.Check
                                label="Hindi"
                                type="checkbox"
                                value={"Hindi"}
                                checked={spokenLanguages.includes("Hindi")}
                                className="d-flex align-items-center checkbox-custom fw-semibold my-3"
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (e.target.checked) {
                                    setSpokenLanguages([
                                      ...spokenLanguages,
                                      value,
                                    ]);
                                  } else {
                                    setSpokenLanguages(
                                      spokenLanguages.filter(
                                        (language) => language !== value
                                      )
                                    );
                                  }
                                }}
                              />
                              <Form.Check
                                label="Japanese"
                                type="checkbox"
                                value={"Japanese"}
                                checked={spokenLanguages.includes("Japanese")}
                                className="d-flex align-items-center checkbox-custom fw-semibold my-3"
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (e.target.checked) {
                                    setSpokenLanguages([
                                      ...spokenLanguages,
                                      value,
                                    ]);
                                  } else {
                                    setSpokenLanguages(
                                      spokenLanguages.filter(
                                        (language) => language !== value
                                      )
                                    );
                                  }
                                }}
                              />
                              <Form.Check
                                label="Spanish"
                                type="checkbox"
                                value="Spanish"
                                checked={spokenLanguages.includes("Spanish")}
                                className="d-flex align-items-center checkbox-custom fw-semibold my-3"
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (e.target.checked) {
                                    setSpokenLanguages([
                                      ...spokenLanguages,
                                      value,
                                    ]);
                                  } else {
                                    setSpokenLanguages(
                                      spokenLanguages.filter(
                                        (language) => language !== value
                                      )
                                    );
                                  }
                                }}
                              />
                            </Col>
                            <Col md={6}>
                              <Form.Check
                                label="Korean"
                                type="checkbox"
                                value={"korean"}
                                checked={spokenLanguages.includes("Korean")}
                                className="d-flex align-items-center checkbox-custom my-3 fw-semibold"
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (e.target.checked) {
                                    setSpokenLanguages([
                                      ...spokenLanguages,
                                      value,
                                    ]);
                                  } else {
                                    setSpokenLanguages(
                                      spokenLanguages.filter(
                                        (language) => language !== value
                                      )
                                    );
                                  }
                                }}
                              />
                              <Form.Check
                                label="Chinese"
                                type="checkbox"
                                value={"Chinese"}
                                checked={spokenLanguages.includes("Chinese")}
                                className="d-flex align-items-center checkbox-custom my-3 fw-semibold"
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (e.target.checked) {
                                    setSpokenLanguages([
                                      ...spokenLanguages,
                                      value,
                                    ]);
                                  } else {
                                    setSpokenLanguages(
                                      spokenLanguages.filter(
                                        (language) => language !== value
                                      )
                                    );
                                  }
                                }}
                              />
                              <Form.Check
                                label="French"
                                type="checkbox"
                                value={"French"}
                                checked={spokenLanguages.includes("French")}
                                className="d-flex align-items-center checkbox-custom fw-semibold"
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (e.target.checked) {
                                    setSpokenLanguages([
                                      ...spokenLanguages,
                                      value,
                                    ]);
                                  } else {
                                    setSpokenLanguages(
                                      spokenLanguages.filter(
                                        (language) => language !== value
                                      )
                                    );
                                  }
                                }}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="profession" className="my-3">
                          <Form.Label className="fw-semibold fs-4">
                            Profession:
                          </Form.Label>
                          <Form.Control
                            placeholder="Profession"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            size="lg"
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group className="my-3">
                          <Form.Label className="fw-semibold fs-4">
                            Account Number:
                          </Form.Label>
                          <Form.Control
                            type="number"
                            inputMode="numeric"
                            placeholder="Account number"
                            value={accountNumber}
                            required
                            size="lg"
                            onChange={(e) => {
                              setAccountNumber(e.target.value);
                            }}
                          />
                        </Form.Group>
                        <Form.Group className="my-3">
                          <Form.Label className="fw-semibold fs-4">
                            Bank Name:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Bank name (ex.Bhutan National Bank)"
                            value={bankName}
                            required
                            size="lg"
                            onChange={(e) => {
                              setBankName(e.target.value);
                            }}
                          />
                        </Form.Group>
                        <Form.Group className="my-3">
                          <Form.Label className="fw-semibold fs-4">
                            Bio:
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            className="textarea-custom"
                            placeholder="Write a short bio about yourself. You can include any additional information you would like your guests to know."
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            size="lg"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="danger"
                    type="button"
                    onClick={resetHostHandler}
                  >
                    Discard Changes
                  </Button>
                  {isLoadingUpdateHost ? (
                    <Button type="submit" size="lg" className="ms-3" disabled>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </Button>
                  ) : (
                    <Button type="submit" variant="success" className="ms-3">
                      Save Changes
                    </Button>
                  )}
                </div>
              </Form>
            )}
          </>
        )}
      </Col>
    </Row>
  );
}

export default ProfilePage;
