export default function formatDateToDDMMYYYY(date: Date): string {
    const day: string = String(date.getDate()).padStart(2, "0");
    const month: string = String(date.getMonth() + 1).padStart(2, "0");
    const year: string = String(date.getFullYear());

    if (isNaN(date.getTime())) {
        return "Invalid Date"; 
    }
    return day + "/" + month + "/" + year;
}