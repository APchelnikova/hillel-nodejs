import { User } from "./domain";

declare global {
    namespace VendorSDK {
        interface Context {
            user?: User;
        }
    }
}

function handleContext(context: VendorSDK.Context): void {
    console.log(context.requestId);
    console.log(context.user?.email);
    console.log(context.user?.role);
}

const context: VendorSDK.Context = {
    requestId: "req-123",
    user: {
        id: 1,
        createdAt: new Date(),
        email: "test@example.com",
        role: "admin"
    }
};

handleContext(context);

// Завдання 9

type UserId = number & { readonly __brand: "UserId" };
type OrderId = number & { readonly __brand: "OrderId" };


function getUser(id: UserId) {
    console.log(id);
}

declare const userId: UserId;
declare const orderId: OrderId;

getUser(userId);
// getUser(orderId); TS2345: Argument of type OrderId is not assignable to parameter of type UserId
                 // Types have separate declarations of a private property __brand


// Завдання 10

export const CHANNELS = ["email", "sms", "push", "telegram"] as const;

export type Channel = (typeof CHANNELS)[number];