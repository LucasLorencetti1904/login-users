import type { UserType } from "../domain/schemas/UserSchema";

interface ApiResults {
    success: boolean;
    data: string;
}

export default async function userFetchApi(user: UserType): Promise<never | ApiResults> {
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
            data: data.message
        };
    }
    catch(error: any) {
        return {
            success: false,
            data: error.message
        }
    }
}
