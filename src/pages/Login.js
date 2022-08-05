import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode"
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { googleSignIn, login } from "../redux/features/authSlice";
//import { GoogleLogin } from "react-google-login";



const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };


  const [user, setUser] = useState({})

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject)

    const name =userObject.name
    const email = userObject.email
    const token = response.credential
    const googleId = userObject.sub
    const result = { email, name, token, googleId };
    dispatch(googleSignIn({ result, navigate, toast }));


    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event){
    setUser({})
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(()=>{
    /* global google*/
    google.accounts.id.initialize({
      client_id : "32685275726-qs3ef62k1i9n4ndchkr1ohlvmh856q1i.apps.googleusercontent.com",
      callback : handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme : "outline" , size: "large"  }
    );

    //google.accounts.id.prompt();

  },[]);







  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >








      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your email"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your password"
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />


            <div id="signInDiv" style={{marginLeft:'20%'}}></div> 

{/*              { Object.keys(user).length != 0 &&
                <button onClick={ (e) => handleSignOut(e)  } >Sign Out</button>
              }


              {user && <div> 
                
                <img src={user.picture} /> 
                <h3> {user.name} </h3>


              </div>} */ }






              

        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an account ? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;