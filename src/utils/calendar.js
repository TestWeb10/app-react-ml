import dayjs from "dayjs";

export const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

    const arrayOfDate = [];

    // Previous dates
    for (let i = 0; i < firstDateOfMonth.day(); i++) {
        const date = firstDateOfMonth.day(i);
        arrayOfDate.push({
            currentMonth: false,
            date: date,
            today: false
        });
    }

    // Current date
    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
        arrayOfDate.push({
            currentMonth: true,
            date: firstDateOfMonth.date(i),
            today: firstDateOfMonth.date(i).toDate().toDateString() === dayjs().toDate().toDateString(),
        });
    }

    // Remaining dates
    const remaining = (6 * 7) - arrayOfDate.length;
    for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remaining; i++) {
        arrayOfDate.push({
            currentMonth: false,
            date: lastDateOfMonth.date(i),
            today: false
        });
    }

    return arrayOfDate;
};

export const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

export const days = ["D", "L", "M", "M", "J", "V", "S"]