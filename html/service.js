// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option

const PUBLIC_KEY =
  "BO9OtWBl9CKSy9_5LEMN6t1onvIW-p0fBX5iC7BU23dhTlHCdl3y6JQHoq7k_U6Paulsjjto4Tku0BHaA-VmC68";
const PRIVATE_KEY = "AiqeIuOkkjbcsNDGp0tc21EhpLCrmHQlayuScpc1MNs";

// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};
const saveSubscription = async (subscription) => {
  const SERVER_URL = "http://localhost:4000/save-subscription";
  const response = await fetch(SERVER_URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
  return response.json();
};
self.addEventListener("activate", async () => {
  // This will be called only once when the service worker is installed for first time.
  try {
    const applicationServerKey = urlB64ToUint8Array(PUBLIC_KEY);
    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await self.registration.pushManager.subscribe(options);
    console.log({ subscription });
    const response = await saveSubscription(subscription);
    console.log({ response });
  } catch (err) {
    console.log("Error", err);
  }
});
self.addEventListener("push", function (event) {
  if (event.data) {
    console.log("Push event!! ", event.data.text());
    event.waitUntil(
      showLocalNotification("Yolo", event.data.text(), self.registration)
    );
  } else {
    console.log("Push event but no data");
  }
});
const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body,
    // here you can add more properties like icon, image, vibrate, etc.
  };
  swRegistration.showNotification(title, options);
};
