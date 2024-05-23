import { format, parse } from 'date-fns';

export const dateFormat = (config: { date: Date; desiredFormat: string }) => {
    return format(config?.date, config.desiredFormat);
};

export const dateParse = ({
    date,
    format,
}: {
    date: string;
    format: string;
}) => {
    return parse(date, format, new Date());
};
