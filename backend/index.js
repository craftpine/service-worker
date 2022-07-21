const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const webpush = require("web-push");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 4000

const dummyDb = { subscription: null }; //dummy in memory store
const saveToDatabase = async (subscription) => {
  // Since this is a demo app, I am going to save this in a dummy in memory store. Do not do this in your apps.
  // Here you should be writing your db logic to save it.
  dummyDb.subscription = subscription;
};
// The new /save-subscription endpoint
app.post("/save-subscription", async (req, res) => {
  const subscription = req.body;
  await saveToDatabase(subscription); //Method to save the subscription to Database
  res.json({ message: "success" });
});

const PUBLIC_KEY =
  "BO9OtWBl9CKSy9_5LEMN6t1onvIW-p0fBX5iC7BU23dhTlHCdl3y6JQHoq7k_U6Paulsjjto4Tku0BHaA-VmC68";
const PRIVATE_KEY = "AiqeIuOkkjbcsNDGp0tc21EhpLCrmHQlayuScpc1MNs";

const vapidKeys = {
  publicKey: PUBLIC_KEY,
  privateKey: PRIVATE_KEY,
};
//setting our previously generated VAPID keys
webpush.setVapidDetails(
  "mailto:myuserid@email.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend = "") => {
  webpush.sendNotification(subscription, dataToSend);
};

//route to test send notification
app.get("/send-notification", (req, res) => {
  const subscription = dummyDb.subscription; //get subscription from your databse here.
  const message = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

  The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`;
  sendNotification(subscription, message);
  res.json({ message: "message sent" + Date.now() });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
