interface User {
    id: number;
    name: string;
}

interface Post {
    id: number;
    title: string;
}

async function fetchUser(): Promise<User> {
    return { id: 1, name: "Alina" };
}

async function fetchPosts(): Promise<Post[]> {
    return [
        { id: 1, title: "First Post" },
        { id: 2, title: "Second Post" },
    ];
}

async function withLogging<T>(
    name: string,
    fn: () => Promise<T>
): Promise<T> {
    console.log(`Start: ${name}`);
    const result = await fn();
    console.log(`Finish: ${name}`);
    return result;
}

const user = await withLogging("fetchUser", () => fetchUser());
const posts = await withLogging("fetchPosts", () => fetchPosts());

console.log(user);
console.log(posts);