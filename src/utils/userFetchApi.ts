export default async function userFetchApi(user) {
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

    return true
}
