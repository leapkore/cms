import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email) {
      return setErrorMessage("All Fields Are Required!");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/signin');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="signuppage">
      <div className="auth-close-button">
        <Link to="/">
          <i className={"fas fa-arrow-left"}></i>
        </Link>
      </div>
      <div className="signuppage-container">
        <div className="signup-left-container">
          <h1>Join the Community!</h1>
          <p>
            Unlock the full potential of community management with ease.
            Collaborate, organize, and engage all in one place. Create your
            account now and start building meaningful connections.
          </p>
          <div className="signin-button-authpage">
            <Link to="/">Login Now</Link>
          </div>
        </div>
        <div className="signup-right-container">
          <div className="signup-right-inner-container">
            <h2>Create Account</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div>
                <div className="form-lable-auth">Create a Username</div>
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  onChange={handleChange}
                />
              </div>
              <div>
              <div className="form-lable-auth">Enter Email Id</div>
                <input
                  type="email"
                  placeholder="Email Id"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div>
              <div className="form-lable-auth">Enter a Password</div>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <button className="auth-button" type="submit" disabled={loading}>
                {loading ? (
                  'Loading...'
                ) : 'Register'}
              </button>
            </form>

            {errorMessage && <div className="alert-form">{errorMessage}</div>}

            <div className="redirect-class">
              Have an account? <span><Link to="/signin">Sign In</Link></span> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
