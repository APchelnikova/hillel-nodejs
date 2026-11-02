export interface User {
    readonly id: number;
    readonly createdAt: Date;
    email: string;
    phone?: string;
    role: "admin" | "user" | "guest";
    preferences?: {
        emailEnabled?: boolean;
        smsEnabled?: boolean;
    };
}

const admin: User = {
    id: 1,
    createdAt: new Date(),
    email: "admin@example.com",
    phone: "+380991234567",
    role: "admin",
    preferences: {
        emailEnabled: true,
        smsEnabled: true,
    },
};

const guest: User = {
    id: 2,
    createdAt: new Date(),
    email: "guest@example.com",
    role: "guest"
};

// admin.id = 4; TS2540: Cannot assign to id because it is a read-only property.
// admin.role = "administrator"; //TS2322: Type "administrator" is not assignable to type "admin" | "guest" | "user"
// guest.email = 123; TS2322: Type number is not assignable to type string

interface Admin extends User {
    permissions: readonly string[];
    role: "admin";
}

type WithStringId = { id: string; label: string };
type WithNumberId = { id: number; count: number };

type Broken = WithStringId & WithNumberId;

/* const broken: Broken = {
    id: 1,
    label: "Test",
    count: 10,
}; */

// The expected type comes from property 'id', which is declared here on type 'Broken', 41 type WithStringId = { id: string; label: string }
// TS2322: Type number is not assignable to type ever

type SafeMerge = Omit<WithStringId, keyof WithNumberId> & WithNumberId;

const broken: SafeMerge = {
    id: 1,
    label: "Test",
    count: 10,
};