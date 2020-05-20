import moment from 'moment';

export const getDateArray = (date) => {
  return moment(date)
    .format("YYYY-MM-DD HH:mm:ss")
    .split(" ")
    .map((item, index) => {
      return index === 0
        ? item
            .split("-")
            .map((date, dateIndex) =>
              dateIndex !== 1 ? Number(date) : Number(date) - 1
            )
        : item
        ? item.split(":").map((time) => Number(time))
        : [12, 0, 0];
    })
    .flat();
};
