import React, { useEffect, useState } from "react";

const formInputdata = [
  { name: "email", type: "email" },
  { name: "name", type: "text" },
  { name: "age", type: "number" },
  { name: "gender", type: "text" },
];
function formValidation(field, value) {
  if (value.trim() === "") {
    return `${field} field is empty`;
  }
  return "";
}

function Form() {
  const cachedData = JSON.parse(localStorage.getItem("formdata")) || {};

  const [userData, setUserData] = useState({
    name: cachedData.name || "",
    age: cachedData.age || "",
    email: cachedData.email || "",
    gender: cachedData.gender || "",
  });

  const [errors, setErrors] = useState({});

  function inputChangeHandler(value, name) {
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    const errorMsg = formValidation(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  }
  console.log(errors);
  function focusHandler(e) {
    const { name } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Validate all fields before submitting
    const newErrors = {};
    Object.keys(userData).forEach((key) => {
      const errorMsg = formValidation(key, userData[key]);
      if (errorMsg) newErrors[key] = errorMsg;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Clear form and local storage after successful submission
    setUserData({
      name: "",
      age: "",
      email: "",
      gender: "",
    });
    localStorage.removeItem("formdata");
    setErrors({});
  };

  function getData() {
    console.log("Cached Data:", JSON.parse(localStorage.getItem("formdata")));
  }

  function saveToLocalStorage(userData) {
    localStorage.setItem("formdata", JSON.stringify(userData));
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      saveToLocalStorage(userData);
    }, 1000);
    return () => clearTimeout(timer);
  }, [userData]);

  return (
    <div className="flex flex-col">
      <form className="w-[80%] m-auto" onSubmit={onSubmitHandler}>
        {formInputdata.map(({ type, name }, i) => (
          <div key={i} className="mb-4">
            <input
              name={name}
              type={type}
              placeholder={`Enter your ${name}`}
              className={`p-3 w-full border m-3 ${
                errors[name] ? "border-red-500" : "border-black"
              }`}
              value={userData[name]}
              onChange={(e) =>
                inputChangeHandler(e.target.value, e.target.name)
              }
              onBlur={handleBlur}
              onFocus={focusHandler}
            />
            {errors[name] && (
              <p className="text-red-500 text-sm mx-4">{errors[name]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
      <button
        onClick={getData}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Get Data
      </button>
    </div>
  );
}

export default Form;
