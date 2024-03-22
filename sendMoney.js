const mongoose = require("mongoose");
// const bill = require("./database");
const Cost = require("./Cost");

const bill = 57;

const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://raebelchristo:amber47@cluster0.c50zie8.mongodb.net/carparking?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("database 2 connected");
      const sendData = async () => {
        await Cost.findOneAndUpdate({ price: bill })
          .then((updatedDoc) => {
            console.log(updatedDoc);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      sendData();
    })
    .catch((e) => {
      console.log(e);
    });
};

connectDB();
