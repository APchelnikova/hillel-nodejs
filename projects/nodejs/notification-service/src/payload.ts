import { Channel } from "./index";

type Priority = "low" | "normal" | "high";

interface EmailPayload {
    channel: Channel & "email";
    priority: Priority;
    to: string;
    subject: string;
    body: string;
    attachments?: string[];
}

interface SmsPayload {
    channel: Channel & "sms";
    priority: Priority;
    to: string;
    text: string;
}

interface PushPayload {
    channel: Channel & "push";
    priority: Priority;
    deviceToken: string;
    title: string;
    body: string;
    badge?: number;
}

interface TelegramPayload {
    channel: Channel & "telegram";
    chatId: string;
    text: string;
}

export type NotificationPayload = EmailPayload | SmsPayload | PushPayload | TelegramPayload;

export function describe(payload: NotificationPayload): string {
    switch (payload.channel) {
        case "email":
            return `Email to ${payload.to}: ${payload.subject} - ${payload.body}`;

        case "sms":
            //return `SMS to ${payload.to}: ${payload.subject}`; TS2339: Property subject does not exist on type SmsPayload
            return `SMS to ${payload.to}: ${payload.text}`;

        case "push":
            return `Push to ${payload.deviceToken}: ${payload.title} - ${payload.body}`;

        case "telegram":
            return `Telegram to ${payload.chatId}: ${payload.text}`;

        default: {
            // TS2322: Type TelegramPayload is not assignable to type never
            const exhaustive: never = payload;
            throw new Error(`Невідомий канал: ${JSON.stringify(exhaustive)}`);
        }

    }
}