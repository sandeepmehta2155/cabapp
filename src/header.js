import { useLocation } from "react-router-dom";

export function Header() {
  //getting the user name
  const user = new URLSearchParams(useLocation().search).get("userid");
  return (
    <>
      {" "}
      {/* definining header component */}
      <h1>
        Cab-app{" "}
        <span role="img" aria-labelledby="cab">
          🚕{" "}
        </span>
      </h1>
      <h1> Welcome {user} ! </h1>{" "}
    </>
  );
}
