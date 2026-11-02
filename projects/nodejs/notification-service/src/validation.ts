import { describe, NotificationPayload } from "./payload";

function isNotificationPayload(
    value: unknown
): value is NotificationPayload {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    if (!("channel" in value)) {
        return false;
    }

    switch (value.channel) {
        case "sms":
            return (
                "to" in value &&
                typeof value.to === "string" &&
                "text" in value &&
                typeof value.text === "string" &&
                "priority" in value &&
                (value.priority === "low" || value.priority === "high")
            );

        default:
            return false;
    }
}

function handleIncoming(raw: unknown): void {
    if (!isNotificationPayload(raw)) {
        console.log("Invalid payload");
        return;
    }

    console.log(describe(raw));
}

handleIncoming({ channel: "sms", to: "+380...", text: "hi", priority: "low" });  // валідно
handleIncoming({ channel: "sms", to: "+380...", priority: "low" });              // немає text
handleIncoming({ channel: "carrier-pigeon", text: "hi" });                       // невідомий канал
handleIncoming(null);                                                            // не впасти!
handleIncoming("просто рядок");                                                  // теж не впасти
