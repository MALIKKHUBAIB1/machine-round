import  { useRef } from "react";

function Cookies() {
  const ref = useRef(null);
  function setCookies(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * (1000 * 60 * 60 * 24));
      expires = "expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/;";
  }
  function submitHandler(e) {
    e.preventDefault();
    if (ref.current) {
      const value = ref.current.value;
      setCookies("user", value, 7);
      setCookies("user2", value, 7);
    }
  }
  function eraseCookies(name) {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  function getCookies(name) {
    let nameQ = name + "=";
    let cookie = document.cookie;
    let cookies = cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      let c = cookies[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameQ) === 0) {
        // Return the value of the cookie after the "name="
        return c.substring(nameQ.length);
      }
    }
    // Return null if no matching cookie is found
    return null;
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter you username"
          ref={ref}
          className="p-2 w-64 border border-black"
        ></input>
        <button type="submit" className="w-24 border border-black p-2 mx-2">
          submit
        </button>
        <button
          type="submit"
          className="w-24 border border-black p-2 mx-2"
          onClick={eraseCookies}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Cookies;
