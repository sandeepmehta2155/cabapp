import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export function UserInput() {
  // variables for yaking user input
  const [selectCab, setSelectCab] = useState();
  const [originPlace, setOriginPlace] = useState("");
  const [destinationPlace, setDestinationPlace] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  // description of types of vehicle available and their liabilites
  const vehicleObj = [
    { name: "cabX", pricePerKm: 18, MaxNoOfPassenger: 4, averageSpeed: 25 },
    { name: "cabXL", pricePerKm: 26, MaxNoOfPassenger: 6, averageSpeed: 18 },
    { name: "cabLux", pricePerKm: 36, MaxNoOfPassenger: 4, averageSpeed: 20 },
    { name: "cabAuto", pricePerKm: 15, MaxNoOfPassenger: 2, averageSpeed: 40 },
    { name: "cabBike", pricePerKm: 10, MaxNoOfPassenger: 1, averageSpeed: 50 }
  ];

  // variables used for models

  const [booking, setBooking] = useState("none");

  const [confirm, setConfirm] = useState("none");

  // calculates a random distance
  const Distance = Math.floor(Math.random() * 100);

  // user input validations
  const [isUserName, setIsUserName] = useState("none");
  const [isOriginPlace, setIsOriginPlace] = useState("none");
  const [isDestinationPlace, setIsDestinationPlace] = useState("none");
  const [isSelectCab, setIsSelectCab] = useState("none");
  const [isPaymentMethod, setIsPaymentMethod] = useState("none");

  //taking userid

  const userid = new URLSearchParams(useLocation().search).get("userid");

  //Total price
  const totalPrice =
    Distance * selectCab?.pricePerKm + Distance * selectCab?.pricePerKm * 0.18;

  //Farefee
  const fareFee =
    Distance * selectCab?.pricePerKm +
    Distance * selectCab?.pricePerKm * 0.18 -
    (Distance * selectCab?.pricePerKm +
      Distance * selectCab?.pricePerKm * 0.18) *
      0.15;

  //function for checking user details entered
  function UserValidation() {
    if (!userid) setIsUserName("block");
    else setIsUserName("none");

    if (!originPlace) setIsOriginPlace("block");
    else setIsOriginPlace("none");

    if (!destinationPlace) setIsDestinationPlace("block");
    else setIsDestinationPlace("none");

    if (!selectCab) setIsSelectCab("block");
    else setIsSelectCab("none");

    if (!paymentMethod) setIsPaymentMethod("block");
    else setIsPaymentMethod("none");
  }

  //function for calling backend code
  async function CallCabDB() {
    axios
      .post("https://cabapp.sandeepmehta215.repl.co/newbookedcab", {
        passengerId: userid,
        driverId: "dvr1234",
        totalPrice: totalPrice,
        fareFee: fareFee
      })
      .then((resp) => {
        if (resp.data.message === "Booking added in DB") setConfirm("block");
      });
  }

  return (
    <>
      <br />
      <br />

      <fieldset>
        <legend>
          <span role="img" aria-labelledby="cab">
            {" "}
            🚖
          </span>{" "}
        </legend>
        <label> Enter your place of origin : </label>
        <input
          type="text"
          placeholder="Enter origin place here"
          onChange={(e) => setOriginPlace(e.target.value)}
        />
        <br />
        <small style={{ color: "red", display: isOriginPlace }}>
          Please enter valid inputs
        </small>
        <br />
        <label> Enter your place of destination : </label>
        <input
          type="text"
          placeholder="Enter destination place here"
          onChange={(e) => setDestinationPlace(e.target.value)}
        />
        <br />
        <small style={{ color: "red", display: isDestinationPlace }}>
          Please enter valid inputs
        </small>
        <br />
        <label> Select the type of vehicle : </label>
        <select
          onChange={(e) => {
            setSelectCab(vehicleObj.find((obj) => obj.name === e.target.value));
          }}
        >
          <option></option>
          <optgroup label="Car-Cab">
            <option value="cabX"> CabX </option>
            <option value="cabXL"> CabXL </option>
            <option value="cabLux"> CabLux </option>
          </optgroup>
          <optgroup label="Rikshaw-Cab">
            <option value="cabAuto"> CabAuto </option>
          </optgroup>

          <optgroup label="Auto Bike-Cab">
            <option value="cabBike"> CabBike </option>
          </optgroup>
        </select>
        <br />
        <small style={{ color: "red", display: isSelectCab }}>
          Please enter valid inputs
        </small>
        <br />

        <label> Payment method : </label>
        <select onChange={(e) => setPaymentMethod(e.target.value)}>
          <option />
          <option>Wallet</option>
          <option>NetBanking</option>
          <option>Credit Card</option>
        </select>
        <br />
        <small style={{ color: "red", display: isPaymentMethod }}>
          Please enter valid inputs
        </small>
        <br />

        <small style={{ color: "red", display: isUserName }}>
          Enter valid username
        </small>
        <br />
        <button
          onClick={() => {
            UserValidation();

            if (
              originPlace &&
              destinationPlace &&
              selectCab &&
              paymentMethod &&
              userid
            )
              setBooking("block");
          }}
        >
          Submit
        </button>
      </fieldset>
      {/* For making confirmation of the cab */}
      <fieldset style={{ display: booking }}>
        Confirm to book your cab ? <br /> <br />
        <button
          onClick={() => {
            setBooking("none");
            CallCabDB();
          }}
        >
          {" "}
          Confirm{" "}
        </button>
      </fieldset>
      {/* Display cab details */}
      <fieldset style={{ display: confirm }}>
        <h2> Hurray! your cab has been booked </h2>
        <span> Place of origin : {originPlace} </span> <br /> <br />
        <span> Place of destination : {destinationPlace} </span> <br /> <br />
        <span>
          {" "}
          Cab-selected : {selectCab?.name}{" "}
          <span style={{ color: "gray" }}>
            {" "}
            with max {selectCab?.MaxNoOfPassenger} passengers
          </span>
        </span>
        <br /> <br />
        <span> Distance : {Distance} Km</span> |
        <span> Price : ₹ {Distance * selectCab?.pricePerKm} </span> |
        <span>
          {" "}
          Estimated time : {(Distance / selectCab?.averageSpeed).toFixed(
            2
          )}{" "}
          hours
        </span>
        <br />
        <br />
        <h4>Total Price (18% tax) : ₹ {totalPrice}</h4>
        <h4>Fare fee (deducting 15% from total amount) : ₹{fareFee}</h4>
        <br />
        <span>Payment Method : {paymentMethod}</span>
        <br />
        <br />
        <br />
        <small style={{ color: "gray" }}>
          {" "}
          * Distance is adopted as random number
        </small>
        <br />
        <small style={{ color: "gray" }}>
          * Price is calculated based on distance and Price/km cab charges
        </small>
        <br />
        <small style={{ color: "gray" }}>
          {" "}
          * Estimated time is calculated based on distance and average speed of
          cab
        </small>
      </fieldset>
    </>
  );
}
