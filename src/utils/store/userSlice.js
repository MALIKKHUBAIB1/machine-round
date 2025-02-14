import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: [
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
  ],

  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    reemoveUser: (state, action) => {
      const filterUser = state.filter((user) => user.id != action.payload);
      return filterUser;
    },
  },
});
export const { addUser, reemoveUser } = userSlice.actions;
export default userSlice.reducer;
