export default function formatDateToDDMMYYYY(date: Date): string {
    if (date.toString() == "Invalid Date") {
        return "Invalid Date";
    }

    const day: string = String(date.getDate()).padStart(2, "0");
    const month: string = String(date.getMonth() + 1).padStart(2, "0");
    const year: string = String(date.getFullYear());

    return day + "/" + month + "/" + year;
}