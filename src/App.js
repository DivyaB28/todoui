import "./App.css";
import React, { Component } from "react";
import ReactSelect from "react-select";

const countryList = [
  { value: "india", label: "India" },
  { value: "us", label: "US" },
  { value: "australia", label: "Australia" },
];

const languageList = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "spanish", label: "Spanish" },
  { value: "arabic", label: "Arabic" },
];
class App extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        gender: null,
        language: [],
        country: null,
        zipCode: "",
      },
      formErrors: {
        name: null,
        email: null,
        mobile: null,
        password: null,
        confirmPassword: null,
        gender: null,
        language: null,
        country: null,
      },
    };
  }

  handleChange = (e) => {
    const { name, value, checked } = e.target;
    const { form, formErrors } = this.state;
    let formObj = {};
    if (name === "language") {
      if (checked) {
        formObj = { ...form };
        formObj[name].push(value);
      } else {
        formObj = {
          ...form,
          [name]: form[name].filter((x) => x !== value),
        };
      }
    } else {
      formObj = { ...form, [name]: value };
    }
    this.setState({ form: formObj }, () => {
      if (!Object.keys(formErrors).includes(name)) return;
      let formErrorObj = [];
      if (name === "password" || name === "confirmPassword") {
        let refValue =
          this.state.form[name === "password" ? "confirmPassword" : "password"];
        const errMsg = this.validateFields(name, value, refValue);
        formErrorObj = { ...formErrors, [name]: errMsg };
        if (!errMsg && refValue) {
          formErrorObj.confirmPassword = null;
          formErrorObj.password = null;
        }
      } else {
        const errorMsg = this.validateFields(
          name,
          name === "language" ? this.state.form["language"] : value
        );
        formErrorObj = { ...formErrors, [name]: errorMsg };
      }
      this.setState({ formErrors: formErrorObj });
    });
  };

  validateFields = (name, value, refValue) => {
    let errMsg = null;
    switch (name) {
      case "name":
        if (!value) errMsg = "Please enter Name";
        break;
      case "email":
        if (!value) errMsg = "Please enter Email";
        else if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
        )
          errMsg = "Please enter Email";
        break;
      case "mobile":
        if (!value) errMsg = "Please enter Mobile";
        break;
      case "country":
        if (!value) errMsg = "Please select Country.";
        break;
      case "gender":
        if (!value) errMsg = "Please select Gender.";
        break;
      case "password":
        // refValue is the value of Confirm Password field
        if (!value) errMsg = "Please enter Password.";
        else if (refValue && value !== refValue)
          errMsg = "Password and Confirm Password does not match.";
        break;
      case "confirmPassword":
        // refValue is the value of Password field
        if (!value) errMsg = "Please enter Confirm Password.";
        else if (refValue && value !== refValue)
          errMsg = "Password and Confirm Password does not match.";
        break;
      case "language":
        if (value.length === 0) errMsg = "Please select Language.";
        break;
      default:
        break;
    }
    return errMsg;
  };

  validateNumber = (evt) => {
    var theEvent = evt || window.event;
    console.log(theEvent.type);
    //handle paste
    if (theEvent === "paste") {
      var key = theEvent.clipboardData.getData("text/plain");
    } else {
      //handle key press
      key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  };
  render() {
    const { form, formErrors } = this.state;
    return (
      <div className="signup-box">
        <p className="title">Sign up</p>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>
                Name<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={form.name}
                onChange={this.handleChange}
              />
              {formErrors.name && (
                <span className="err">{formErrors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label>
                Email<span className="asterisk">*</span>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={this.handleChange}
                ></input>
              </label>
              {formErrors.email && (
                <span className="err">{formErrors.email}</span>
              )}
            </div>
            <div className="form-group">
              <label>
                Password<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={form.password}
                onChange={this.handleChange}
              />
              {formErrors.password && (
                <span className="err">{formErrors.password}</span>
              )}
            </div>
            <div className="form-group">
              <label>
                Confirm Password<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={this.handleChange}
              />
              {formErrors.confirmPassword && (
                <span className="err">{formErrors.confirmPassword}</span>
              )}
            </div>
            <div className="form-group">
              <label className="mr-3">Language</label>
              <div className="form-control border-0 p-0 pt-1">
                {languageList.map((x, i) => {
                  return (
                    <label key={i} className="mr-3">
                      <input
                        type="checkbox"
                        name="language"
                        value={x.value}
                        checked={form.language.includes(x.value)}
                        onChange={this.handleChange}
                      />
                      {x.label}
                    </label>
                  );
                })}
              </div>
              {formErrors.language && (
                <span className="err">{formErrors.language}</span>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>
                Mobile<span className="asterisk">*</span>
                <input
                  className="form-control"
                  type="text"
                  name="mobile"
                  onChange={this.handleChange}
                  onKeyPress={() => this.validateNumber}
                />
              </label>
              {formErrors.mobile && (
                <span className="err">{formErrors.mobile}</span>
              )}
            </div>
            <div className="form-group">
              <label>
                Gender<span className="asterisk">*</span>
              </label>
              <div className="form-control border-0 p-0 pt-1">
                <label className="mr-3">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={form.gender === "male"}
                    onChange={this.handleChange}
                  />
                  Male
                </label>
                <label className="mr-3">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={form.gender === "female"}
                    onChange={this.handleChange}
                  />
                  Female
                </label>
              </div>
              {formErrors.gender && (
                <span className="err">{formErrors.gender}</span>
              )}
            </div>
            <div className="form-group">
              <label>
                Zip code
                <input
                  className="form-control"
                  type="text"
                  name="zipCode"
                  value={form.zipCode}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Country<span className="asterisk">*</span>
              </label>
              <ReactSelect
                name="country"
                options={countryList}
                value={countryList.find(
                  (country) => country.value === form.country
                )}
                onChange={(e) =>
                  this.handleChange({
                    target: {
                      name: "country",
                      value: e.value,
                    },
                  })
                }
              />
              {formErrors.country && (
                <span className="err">{formErrors.country}</span>
              )}
            </div>
          </div>
        </div>
        <span className="form-group mr-2">
          <input
            type="button"
            className="btn btn-primary"
            value="Submit"
            onClick={() => console.log(`Data: ${JSON.stringify(form)}`)}
          />
        </span>
        <span className="form-group mr-2">
          <input
            type="button"
            className="btn btn-primary"
            value="Clear"
            // onClick={this.setState("")}
          />
        </span>
      </div>
    );
  }
}

export default App;
