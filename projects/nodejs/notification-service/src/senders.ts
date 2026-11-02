import { NotificationPayload } from "./payload";

type SendResult =
    | { ok: true; messageId: string; sentAt: Date }
    | { ok: false; error: string; retryable: boolean };

interface Sender {
    (payload: NotificationPayload): Promise<SendResult>;
    channel: NotificationPayload["channel"];
    isAvailable(): boolean;
}

interface SendLogger {
    (result: SendResult): void;
}

const emailSender = async (payload: NotificationPayload): Promise<SendResult> => {
    console.log("Sending email:", payload);

    return {
        ok: true,
        messageId: "email-123",
        sentAt: new Date(),
    };
};

emailSender.channel = "email";
emailSender.isAvailable = () => true;

const smsSender = async (payload: NotificationPayload): Promise<SendResult> => {
    console.log("Sending SMS:", payload);

    return {
        ok: true,
        messageId: "sms-123",
        sentAt: new Date(),
    };
};

smsSender.channel = "sms";
smsSender.isAvailable = () => true;

const pushSender = async (payload: NotificationPayload): Promise<SendResult> => {
    console.log("Sending push:", payload);

    return {
        ok: false,
        error: "Push service unavailable",
        retryable: true,
    };
};

pushSender.channel = "push";
pushSender.isAvailable = () => false;

async function sendWithLogging(
    payload: NotificationPayload,
    sender: Sender,
    logger: SendLogger
): Promise<void> {
    if (!sender.isAvailable()) {
        console.log(`${sender.channel} is unavailable`);
        return;
    }

    const result = await sender(payload);
    logger(result);
}

const logger: SendLogger = (result) => {
    if (result.ok) {
        console.log("Message ID:", result.messageId);
        console.log("Sent at:", result.sentAt);
    } else {
        console.log("Error:", result.error);
        console.log("Retryable:", result.retryable);
    }
};