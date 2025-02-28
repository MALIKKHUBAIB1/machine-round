import React, { useEffect, useState } from "react";

const vipSection = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
];

const GENERAL_SECTION = [
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24],
  [25, 26, 27, 28, 29, 30],
  [31, 32, 33, 34, 35, 36],
];

// function genrateGrid(row, col) {
//   Array.from({ length: 5 }).map(()=>Array(5).fill(false))
// }
function GenralSection({ setTotalTicket, totalTicket }) {
  //   const [bookedTicket, setBookedTicket] = useState([
  //     [false, false, false, false, false, false],
  //     [false, false, false, false, false, false],
  //     [false, false, false, false, false, false],
  //     [false, false, false, false, false, false],
  //     [false, false, false, false, false, false],
  //     [false, false, false, false, false, false],
  //   ]);
  const [bookedTicket, setBookedTicket] = useState(
    Array.from({ length: 6 }).map(() => Array(6).fill(false))
  );

  function handleBookedTicket(i, j) {
    const newBookeTicket = [...bookedTicket];
    newBookeTicket[i][j] = newBookeTicket[i][j] ? false : true;
    setBookedTicket(newBookeTicket);
    setTotalTicket((prev) => {
      return prev.map((data) => {
        if (data.category === "general") {
          return { ...data, count: data.count + 1 };
        }
        return data;
      });
    });
  }
  return (
    <div className="grid grid-cols-6 w-96 h-96 border border-red-400 text-yellow-500 p-2 my-10 m-auto">
      {GENERAL_SECTION.map((row, i) => {
        return row.map((col, j) => {
          return (
            <button
              key={`${i}+${j}`}
              onClick={() => handleBookedTicket(i, j, "vipSection")}
              className={`${bookedTicket[i][j] && "bg-slate-500 "} m-2`}
            >
              {col}
            </button>
          );
        });
      })}
    </div>
  );
}
function TicketBookSystem() {
  const [bookedTicket, setBookedTicket] = useState(
    Array.from({ length: 5 }).map(() => Array(5).fill(false))
  );
  //   const [bookedTicket, setBookedTicket] = useState([
  //     [false, false, false, false, false],
  //     [false, false, false, false, false],
  //     [false, false, false, false, false],
  //     [false, false, false, false, false],
  //     [false, false, false, false, false],
  //   ]);
  const [totalTicket, setTotalTicket] = useState([
    {
      category: "vip",
      count: 0,
    },
    {
      category: "general",
      count: 0,
    },
  ]);
  useEffect(() => {
    document.body.style.background = "black";
  }, []);

  function handleClick(i, j) {
    const newBookeTicket = [...bookedTicket];
    newBookeTicket[i][j] = newBookeTicket[i][j] ? false : true;

    setBookedTicket(newBookeTicket);

    setTotalTicket((prev) => {
      return prev.map((data) => {
        if (data.category === "vip") {
          return { ...data, count: data.count + 1 };
        }
        return data;
      });
    });
  }

  function handleBooked() {
    const message = totalTicket
      .map(
        ({ category, count }) =>
          `You have booked ${count} ${category} ticket(s)`
      )
      .join(" and ");

    alert(message);
  }

  console.log(totalTicket);
  return (
    <>
      <div className="grid grid-cols-5 w-96 h-96 border border-red-400 text-yellow-500 p-2 my-10 m-auto">
        {vipSection.map((row, i) => {
          return row.map((col, j) => {
            return (
              <button
                key={`${i}+${j}`}
                onClick={() => handleClick(i, j, "vipSection")}
                className={`${bookedTicket[i][j] && "bg-slate-500 "} m-2`}
              >
                {col}
              </button>
            );
          });
        })}
      </div>
      <button
        className="w-40 p-3 border border-red-600 text-white"
        onClick={handleBooked}
      >
        Booked it{" "}
      </button>
      <GenralSection
        setTotalTicket={setTotalTicket}
        totalTicket={totalTicket}
      />
    </>
  );
}

export default TicketBookSystem;
