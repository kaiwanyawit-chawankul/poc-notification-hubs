import { createClientContext, sendNotification } from "@azure/notification-hubs/api";
import { createFcmV1Notification } from "@azure/notification-hubs";
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";
console.log("NOTIFICATIONHUBS_CONNECTION_STRING");
console.log(connectionString);

const context = createClientContext(connectionString, hubName);

const fcmV1RegistrationId = "dDVr-dj1Tz-koLzqThcMl9:APA91bE0ncda6ISRf8iJ7kyu_NtrdGNQGfnbzIImO6FA4VApexz5GbFpgQxFuYyDe3pz6anNQIY2vJYGzvOWTyw4ldZIjydpn81u_JztwO0PqgBRVg85eTM";
const messageBody = `{
    "message": {
      "notification":{
        "title":"Notification Hub Test Notification",
        "body":"This is a sample notification delivered by Azure Notification Hubs."
      },
      "data":{
        "property1":"value1",
        "property2":"42"
      }
    }
}`;

const message = createFcmV1Notification({
  body: messageBody
});

const result = await sendNotification(context, message, { deviceHandle: fcmV1RegistrationId });

console.log(`Tracking ID: ${result.trackingId}`);
console.log(`Correlation ID: ${result.correlationId}`);

// Only available in Standard SKU and above
if (result.notificationId) {
  console.log(`Notification ID: ${result.notificationId}`);
}