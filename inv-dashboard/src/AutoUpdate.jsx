import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AutoUpdate = () => {
  const [data, setData] = useState([]);
  const [prediction, setPrediction] = useState(null);

    const randomDate = () =>  {
    //Month ranges between 1 to 12 months
    let month = Math.floor(Math.random() * (13 - 1) + 1);
    //Identifying months which has 31 days
    let oddDays = [1, 3, 5, 7, 8, 10, 12];
    //Picking random year between 1901 to 2005
    let year = Math.floor(Math.random() * (2005 - 1900) + 1900);
    //Checking whether random month we generated has 31 days
    let day31 = oddDays.includes(month);
    //Handling code if the month has 31 days
    if (day31) {
      //Generating date between 1 to 31 days
      let date = Math.floor(Math.random() * (32 - 1) + 1);
      return new Date(year + "-" + month + "-" + date);
    } else {
      //Checking whether the given year is a leap year and the month is february
      if (year % 4 == 0 && month == 2) {
        //Since its a leap year we should have date ranging between 1 to 29
        let date = Math.floor(Math.random() * (30 - 1) + 1);
        return new Date(year + "-" + month + "-" + date);
      }
      //checking whether the given year is not a leap year and the month is february
      else if (year % 4 != 0 && month == 2) {
        //Since month is february, we are generating date ranging between 1 to 28
        let date = Math.floor(Math.random() * (29 - 1) + 1);
        return new Date(year + "-" + month + "-" + date);
      } else {
        //Since it is not a leap year and the month is not february, we are generating date between 1 to 30
        let date = Math.floor(Math.random() * (31 - 1) + 1);
        return new Date(year + "-" + month + "-" + date);
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesResponse = await axios.get(
          "http://localhost:30000/api/sales"
        );
        setData(salesResponse.data);

        // Automatically predict for a random store, dept, and week
        const randomStore = Math.floor(Math.random() * 2) + 1;
        const randomDept = Math.floor(Math.random() * 2) + 1;
        const randomWeek = Math.floor(Math.random() * 52) + 1;
        const randomDat = randomDate();

        const predictionResponse = await axios.post(
          "http://localhost:30000/api/predict",
          {
            store: randomStore,
            dept: randomDept,
            week: randomWeek,
            date: randomDat
          }
        );
        setPrediction(predictionResponse.data.predicted_sales);
        console.log(predictionResponse);
      } catch (error) {
        console.error("Error fetching data or prediction:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 6000); // Fetch every minute

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  return (
    <div>
      <h1>Real-Time Supply Chain Dashboard for Bananas</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      {prediction !== null && (
        <h3>Predicted Sales: ${prediction.toFixed(2)}</h3>
      )}
    </div>
  );
};

export default AutoUpdate;
