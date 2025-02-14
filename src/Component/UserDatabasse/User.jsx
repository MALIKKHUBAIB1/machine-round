import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reemoveUser, addUser } from "../../utils/store/userSlice";

function UserDataBase() {
  const userDataBase = [
    {
      id: "fgh12345xcvbhgjk",
      name: "John Doe",
      photoUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      dob: "1990-05-14",
      salary: "$70,000",
      address: "123 Main St, New York, USA",
    },
    {
      id: "dfg67890bnmvcdfe",
      name: "Alice Smith",
      photoUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      dob: "1995-07-22",
      salary: "$65,000",
      address: "456 Elm St, Los Angeles, USA",
    },
    {
      id: "poi45678mnbvcxzq",
      name: "Bob Johnson",
      photoUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      dob: "1988-09-10",
      salary: "$80,000",
      address: "789 Oak St, Chicago, USA",
    },
    {
      id: "lkj09876zxcvbnml",
      name: "Charlie Brown",
      photoUrl: "https://randomuser.me/api/portraits/men/4.jpg",
      dob: "1992-12-05",
      salary: "$75,000",
      address: "321 Pine St, Houston, USA",
    },
    {
      id: "yui23456asdfghjk",
      name: "David Williams",
      photoUrl: "https://randomuser.me/api/portraits/men/5.jpg",
      dob: "1985-03-18",
      salary: "$90,000",
      address: "654 Maple St, San Francisco, USA",
    },
    {
      id: "qaz98765wsxedcrf",
      name: "Emma Davis",
      photoUrl: "https://randomuser.me/api/portraits/women/6.jpg",
      dob: "1998-06-30",
      salary: "$60,000",
      address: "987 Cedar St, Miami, USA",
    },
    {
      id: "mnb54321lkjhgfds",
      name: "Frank Miller",
      photoUrl: "https://randomuser.me/api/portraits/men/7.jpg",
      dob: "1991-11-08",
      salary: "$72,000",
      address: "159 Birch St, Seattle, USA",
    },
    {
      id: "tgb67890vfrcdexs",
      name: "Grace Lee",
      photoUrl: "https://randomuser.me/api/portraits/women/8.jpg",
      dob: "1993-04-25",
      salary: "$78,000",
      address: "753 Walnut St, Boston, USA",
    },
    {
      id: "wsx12345edcvfrtg",
      name: "Henry Wilson",
      photoUrl: "https://randomuser.me/api/portraits/men/9.jpg",
      dob: "1987-02-12",
      salary: "$85,000",
      address: "852 Willow St, Denver, USA",
    },
    {
      id: "zxc09876poiuytre",
      name: "Isabella Thomas",
      photoUrl: "https://randomuser.me/api/portraits/women/10.jpg",
      dob: "1996-08-19",
      salary: "$68,000",
      address: "963 Redwood St, Austin, USA",
    },
  ];
  const users = useSelector((state) => state.user);
  const [showUser, setSHowUser] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  function handleDeleteUser(id) {
    dispatch(reemoveUser(id));
  }
  function handleShowUser(id) {
    const findOneUser = users.find((user) => user.id === id);
    setSHowUser(findOneUser);
  }
  function handleShowModal() {
    setShow(!show);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    dispatch(addUser(data));
    setShow(false);
  }
  useEffect(() => {
    document.body.style.background = "black";
  }, []);
  return (
    <div className="text-white">
      <div className="flex border justify-between ">
        <div className="w-full ">
          {users.map((user) => (
            <div key={user.id} className="">
              <div className="bg-blue-300 m-2 p-3 flex justify-between cursor-pointer">
                <div
                  onClick={() => handleShowUser(user.id)}
                  className=" w-10/12 cursor-pointer"
                >
                  {user.name}
                </div>
                <div
                  className="text-red-600 cursor-pointer text-2xl mx-4"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  X
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center w-full p-6">
          {showUser && (
            <div className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <img
                alt={showUser.name}
                src={showUser.photoUrl}
                className="w-full h-96 object-cover"
              />
              <div className="p-5 text-center">
                <h1 className="text-xl font-semibold text-gray-800">
                  {showUser.name}
                </h1>
                <h2 className="text-gray-600 text-sm mt-1">{showUser.dob}</h2>
                <p className="text-lg text-green-600 font-medium mt-3">
                  {showUser.salary}
                </p>
                <p className="text-sm text-gray-500 mt-2">{showUser.address}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        className="w-full border border-red-950 p-4 text-3xl"
        onClick={handleShowModal}
      >
        Add User
      </button>
      {show && (
        <dialog className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xl">
          <form
            className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative"
            onSubmit={handleSubmit}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShow(false)} // Make sure you have a `setShow` function
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold text-gray-800">Add User</h2>

            <input
              type="text"
              className="border border-red-400 p-3 w-full m-2"
              placeholder="enter your name "
              name="name"
            />

            <input
              type="date"
              name="dob"
              className="border border-red-400 p-3 w-full m-2"
              placeholder="enter your dbo "
            />

            <input
              type="text"
              name="salary"
              className="border border-red-400 p-3 w-full m-2"
              placeholder="enter your salary "
            />
            <input
              type="text"
              name="photoUrl"
              className="border border-red-400 p-3 w-full m-2"
              placeholder="enter your photourl "
            />
            <input
              type="text"
              name="adress"
              className="border border-red-400 p-3 w-full m-2"
              placeholder="enter your address "
            />
            <input
              type="text"
              className="border border-red-400 p-3 w-full m-2"
              placeholder="enter your name "
            />

            <div className="mt-4 flex justify-end">
              <button
                className="mx-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => setShow(false)}
              >
                Close
              </button>

              <button
                className="mx-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
}

export default UserDataBase;
