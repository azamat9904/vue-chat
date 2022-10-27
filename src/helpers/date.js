import moment from "moment";

export const isValidDate = (date) => moment(date).isValid();
