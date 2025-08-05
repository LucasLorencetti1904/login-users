import DDMMYYYYDateFormatter from "@interfaces/adapters/dateFormatter/DDMMYYYYDateFormatter";
import { format } from "date-fns";

class DateFnsFormatter implements DDMMYYYYDateFormatter {
    formatDate(date: Date): string {
        return format(date, "dd/MM/yyyy");
    }
}

const ddmmyyyyDateFormatter = new DateFnsFormatter();

export default ddmmyyyyDateFormatter;