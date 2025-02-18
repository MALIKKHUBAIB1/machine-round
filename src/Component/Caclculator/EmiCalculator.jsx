import React, { useEffect, useState } from "react";

function EmiCalculator() {
  const [principal, setPrincipal] = useState("");
  const [interest, setInterest] = useState("");
  const [year, setYear] = useState("");
  const [totalEmi, setTotalEmi] = useState("");

  function handleEmiCalculate() {
    if (principal && interest && year) {
      const P = parseFloat(principal);
      const r = parseFloat(interest);
      const N = parseFloat(year) * 12; // Convert years to months
      const R = r / (12 * 100); // Convert annual interest rate to monthly decimal

      // EMI Calculation
      const EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      setTotalEmi(EMI.toFixed(2)); // Round to 2 decimal places
    }
  }
  useEffect(() => {
    document.body.style.background = "black";
  }, []);

  return (
    <div className="m-4 p-6  text-white max-w-md mx-auto rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">EMI Calculator</h2>

      <input
        type="number"
        className="p-3 w-full mb-3 rounded-md bg-gray-800 text-white"
        value={principal}
        placeholder="Enter Principal Amount"
        onChange={(e) => setPrincipal(e.target.value)}
        onBlur={handleEmiCalculate} // Calculate on blur
      />

      <input
        type="number"
        className="p-3 w-full mb-3 rounded-md bg-gray-800 text-white"
        value={interest}
        placeholder="Enter Annual Interest Rate (%)"
        onChange={(e) => setInterest(e.target.value)}
        onBlur={handleEmiCalculate} // Calculate on blur
      />

      <input
        type="number"
        className="p-3 w-full mb-3 rounded-md bg-gray-800 text-white"
        value={year}
        placeholder="Enter Loan Tenure (Years)"
        onChange={(e) => setYear(e.target.value)}
        onBlur={handleEmiCalculate} // Calculate on blur
      />

      <div className="text-xl font-semibold text-green-400 text-center">
        EMI: ₹ {totalEmi}
      </div>
    </div>
  );
}

export default EmiCalculator;
