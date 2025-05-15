import type { UserType } from "../domain/schemas/UserSchema";

interface ApiResults<T> {
    success: boolean;
    data: T;
}

export default async function userFetchApi(user: UserType): Promise<never | ApiResults<UserType[]>> {
    try {
        const response = await fetch(
            "http://localhost:8000/users/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }
        )
        if (!response.ok) {
            throw new Error("Response error.");
        }
        const data = await response.json();
        return {
            success: true,
            message: data.message
        };
    }
    catch(error) {
        return {
            success: false,
            message: error.message
        }
    }
}
