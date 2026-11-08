// Завдання 1: Enum і базова модель

export enum ItemStatus {
    Available = "AVAILABLE",
    Borrowed = "BORROWED",
    Lost = "LOST",
}

export interface LibraryItemData {
    id: number;
    title: string;
    year: number;
    status: ItemStatus;
    internalNote: string;
}

// Завдання 2: Три похідні типи

export type PublicItem = Omit<LibraryItemData, "internalNote">;
export type ItemPreview = Pick<LibraryItemData, "id" | "title">;
export type ItemUpdate = Partial<Omit<LibraryItemData, "id">>;

const publicItem: PublicItem = {
    id: 1,
    title: "American Psycho",
    year: 1991,
    status: ItemStatus.Available,
};

const preview: ItemPreview = {
    id: 2,
    title: "The Hunger Games",
};

const update: ItemUpdate = {
    status: ItemStatus.Borrowed,
};

console.log(publicItem, preview, update);