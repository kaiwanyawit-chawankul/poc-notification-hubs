import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert("serviceAccountKey.json")
});

const message = {
  notification: {
    title: "Hello!",
    body: "This is a test notification."
  },
  token: "dDVr-dj1Tz-koLzqThcMl9:APA91bE0ncda6ISRf8iJ7kyu_NtrdGNQGfnbzIImO6FA4VApexz5GbFpgQxFuYyDe3pz6anNQIY2vJYGzvOWTyw4ldZIjydpn81u_JztwO0PqgBRVg85eTM"
};

// const message = {
//     notification: {
//         title: "Hello everyone!",
//         body: "This is a broadcast message."
//     },
//     topic: "all"
// }

admin.messaging().send(message)
  .then(res => console.log("Sent:", res))
  .catch(err => console.error("Error:", err));
