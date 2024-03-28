import { format as formatDate } from 'date-fns';

export const getCurrentDate = (format: string) => {
    const date = new Date();
    return formatDate(date, format);
};