export default function formatDateToDDMMYYYY(date: Date): string {
    if (date.toString() == "Invalid Date") {
        return "Invalid Date";
    }

    const day: string = String(date.getUTCDate()).padStart(2, "0");
    const month: string = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year: string = String(date.getUTCFullYear());

    return day + "/" + month + "/" + year;
}