const mongoose = require("mongoose");
const axios = require("axios");
const { Cars } = require("./Cars.js");

let reqCount = 1;
let timeTaken = 0;

let intervalfunction = () => {
  setInterval(() => {
    axios
      .get(
        "https://io.adafruit.com/api/v2/raebelchristo/feeds/leavingcar/data?"
      )
      .then(async (response) => {
        console.log("Request No :" + reqCount);
        const sNo = response.data[0].value;
        if (sNo !== "-1" && sNo !== "-2") {
          console.log(sNo);
          const Target = await Cars.findOne({ slot: sNo });
          console.log(Target);
          const res = await axios.patch(
            `https://io.adafruit.com/api/v2/raebelchristo/feeds/leavingcar/data/${response.data[0].id}?`,
            { value: "-1" }
          );
          const inTime = Target.in_time;
          const outTime = new Date();
          console.log(outTime);
          timeTaken =
            (outTime.getMinutes() - inTime.getMinutes()) * 60 +
            outTime.getSeconds() -
            inTime.getSeconds();

          console.log(timeTaken);

          const deleteEntry = async () => {
            const delStatus = await Cars.findOneAndRemove({
              slot: sNo,
            })
              .then(console.log("deletion successful"))
              .catch("error found with slot " + sNo);
          };

          deleteEntry();
        }

        reqCount += 1;
      })
      .catch((e) => {
        console.log(e);
      });
  }, 2000);
};

const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://raebelchristo:amber47@cluster0.c50zie8.mongodb.net/carparking?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("database 1 connected");
      intervalfunction();
    })
    .catch((e) => {
      console.log(e);
    });
};

connectDB();

const totalBill = timeTaken * 0.01;

module.exports = totalBill;
