interface ApiResponse<T> {
    status: "success" | "error";
    data: T;
}

interface User {
    id: number;
    email: string;
}

interface Post {
    id: number;
    title: string;
}

const userResponse: ApiResponse<User> = {
    status: "success",
    data: { id: 1, email: "test@test.com" }
};

const postsResponse: ApiResponse<Post[]> = {
    status: "success",
    data: [
        { id: 1, title: "First Post" },
        { id: 2, title: "Second Post" },
    ]
};

console.log(userResponse);
console.log(postsResponse);