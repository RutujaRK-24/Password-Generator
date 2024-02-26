import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./index.css";
import "./common.scss";
import img from "./password1.webp";
import copyImg from "./copy-icon-png-17.jpg";

import "./App.css";

function App() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [upperCase, setUpperCase] = useState(true);
  const [lowerCase, setLowerCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [specialChar, setSpecialChar] = useState(true);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  //  const [copy, setCopy] = useState('Copy');
  const [colors, setColor] = useState("#FF0000");
  const onChangePasswordLength = (value) => {
    setPasswordLength(value);
    calculateStrength();
  };

  const handleCheckBox = (event) => {
    const value = event.target.checked;
    switch (event.target.id) {
      case "uppercase":
        setUpperCase(value);
        break;
      case "lowercase":
        setLowerCase(value);
        break;
      case "numbers":
        setNumber(value);
        break;
      case "special chars":
        setSpecialChar(value);
        break;
      default:
        console.log("in default case");
    }
  };

  const calculateStrength = () => {
    if (password.length === 0) return;
    if (password.length >= 12) {
      setStrength("Strong");
      setColor("#12b40e");
      console.log("color", colors);
    } else if (password.length >= 8 && password.length <= 11) {
      setStrength("Medium");
      setColor("#ffa200");
    } else if (password.length >= 2 && password.length <= 7) {
      setStrength("Weak");
      setColor("#ff0000");
    }
    console.log("strength:", strength);
  };

  const generatePassword = () => {
    const password = [];
    let lowerChar = "abcdefghijklmnopqrstuvwxyz";
    let upperChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numbers = "0123456789";
    let specialChar = "!@#$%^&*()_-+={[}]|<?/";
    for (let i = 0; i < passwordLength; i++) {
      const indexofLower = Math.floor(Math.random() * lowerChar.length);
      const indexofUpper = Math.floor(Math.random() * upperChar.length);
      const indexofNumber = Math.floor(Math.random() * numbers.length);
      const indexofSpcChar = Math.floor(Math.random() * specialChar.length);
      var a = [];
      for (
        var j = 0;
        j < document.querySelectorAll('input[type="checkbox"]:checked').length;
        j++
      ) {
        //debugger
        a.push(
          document.querySelectorAll('input[type="checkbox"]:checked')[j]
            .attributes.name.textContent
        );
      }
      // generating a random number
      const no =
        Math.floor(
          Math.random() *
            (document.querySelectorAll('input[type="checkbox"]:checked')
              .length -
              1 +
              1)
        ) + 1;
      switch (a[no - 1]) {
        case "upperCase":
          if (upperCase) password.push(upperChar[indexofUpper]);
          break;
        case "lowerCase":
          if (lowerCase) password.push(lowerChar[indexofLower]);
          break;
        case "numbers":
          if (number) password.push(numbers[indexofNumber]);
          break;
        case "specialChars":
          if (specialChar) password.push(specialChar[indexofSpcChar]);
          break;
      }
    }
    setPassword(password.join(""));
    calculateStrength();
  };
  const copyImage = () => {
    debugger;
    let copideText = document.getElementById("passWord");
    navigator.clipboard.writeText(copideText.value);
    window.alert("text copied");
  };

  return (
    <div className="password-wrapper">
      <div className="gif" style={{ textAlign: "center" }}>
        {<img src={img} alt="Password Gif" className="imgStyle" />}
      </div>
      <div className="tac">
        <h2 className="prjHeader text-center">PASSWORD GENERATOR</h2>
        <p className="subtitle text-center">
          Create strong and secure passwords to keep your account safe online.
        </p>
      </div>
      <div className="password-input-wrapper mt- px-3 row m-0">
        <input
          type="text"
          id="passWord"
          placeholder="Password"
          className="w-75 form-control col-8"
          value={password}
          onChange={generatePassword}
        />
        <button className="copy-btn btn col-1" onClick={copyImage}>
          {
            <img
              src={copyImg}
              alt=""
              className=""
              style={{ height: "20px", width: "26px" }}
            />
          }
        </button>
      </div>

      <p
        className="px-3"
        style={{
          color: `${colors}`,
          fontWeight: "bold",
          marginLeft: "10px",
          marginTop: "15px",
        }}
      >
        {strength}
      </p>
      <div className="lengthText px-3">
        <div>
          <label id="slider-label" className="pswdlabel">
            Password Length:{" "}
          </label>
          <span className="pswdval">{passwordLength}</span>
        </div>
        <Slider
          max={30}
          min={5}
          value={passwordLength}
          onChange={onChangePasswordLength}
          className="slider-style"
        />
      </div>

      <div className="checkbox-wrapper row mt-3 px-3">
        <div className="col-12">
          <label className="marginCls"> UpperCase </label>
          <input
            className="inputcheck float-end"
            type="checkbox"
            name="upperCase"
            id="uppercase"
            onChange={handleCheckBox}
            checked={upperCase}
            value={upperCase}
          />
        </div>

        <div className="col-12">
          <label className="marginCls"> Lowercase </label>
          <input
            type="checkbox"
            className="float-end"
            name="lowerCase"
            id="lowercase"
            onChange={handleCheckBox}
            checked={lowerCase}
            value={lowerCase}
          />
        </div>

        <div className="col-12">
          <label className="marginCls"> Numbers </label>
          <input
            type="checkbox"
            className="float-end"
            name="numbers"
            id="numbers"
            onChange={handleCheckBox}
            checked={number}
          />
        </div>

        <div className="col-12">
          <label className="marginCls"> Special Charcters </label>
          <input
            type="checkbox"
            className="float-end"
            name="specialChars"
            id="special chars"
            onChange={handleCheckBox}
            checked={specialChar}
          />
        </div>
      </div>
      <div className="text-center">
        <button
          className="generate-btn border-0 btn-group mt-2 px-3 py-2"
          onClick={() => generatePassword()}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
