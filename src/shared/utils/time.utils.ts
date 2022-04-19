import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export const getTime = (date: string | Date) => new Date(date).getTime();

export const getMonth = (date?: string | Date) =>
  date
    ? dayjs(new Date(date)).tz('Asia/Tokyo').get('month')
    : dayjs(new Date()).tz('Asia/Tokyo').get('month');

export const getYear = (date?: string | Date) =>
  date
    ? dayjs(new Date(date)).tz('Asia/Tokyo').get('year')
    : dayjs(new Date()).tz('Asia/Tokyo').get('year');

export const getNowUtc = () => dayjs.utc().toDate();

export const getNowUtcWithFormat = (format: string) =>
  dayjs.utc().format(format);

export const getDateWithFormat = (value: string, format: string) =>
  dayjs.utc(value).format(format);

// export const DiffDateCompareNow = (date: Date) => Math.floor(dayjs(date).diff(Date.now(), 'hours') / 24);

export const DiffDateCompareNow = (date: Date) => {
  if (!date) {
    return;
  }
  const timeOnDay = 1000 * 60 * 60 * 24;

  const dateOne = new Date();

  const dateTwo = new Date(date);

  const dateOneUTC = Date.UTC(
    dateOne.getFullYear(),
    dateOne.getMonth(),
    dateOne.getDate(),
  );

  const dateTwoUTC = Date.UTC(
    dateTwo.getFullYear(),
    dateTwo.getMonth(),
    dateTwo.getDate(),
  );

  let difference = dateTwoUTC - dateOneUTC;

  if (difference < 0) {
    difference = 0;
  }
  return difference / timeOnDay;
};

export const getDayOfWeek = (date?: Date) => {
  let newDate;
  date ? (newDate = new Date(date)) : (newDate = new Date());
  const dayOfWeekNumber = dayjs(newDate).tz('Asia/Tokyo').day();
  switch (dayOfWeekNumber) {
    case 0:
      return '日曜日';
      break;
    case 1:
      return '月曜';
      break;
    case 2:
      return '火曜日';
      break;
    case 3:
      return '水曜日';
      break;
    case 4:
      return '木曜日';
      break;
    case 5:
      return '金曜日';
      break;
    case 6:
      return '土曜日';
      break;
  }
};

export const getDate = (date?: string | Date) =>
  date
    ? dayjs(new Date(date)).tz('Asia/Tokyo').get('date')
    : dayjs(new Date()).tz('Asia/Tokyo').get('date');

export const getRealTime = (date?: string | Date) => {
  const newDate = date ? new Date(date) : new Date();
  return (
    dayjs(newDate).tz('Asia/Tokyo').hour() +
    ':' +
    dayjs(newDate).tz('Asia/Tokyo').minute()
  );
};

export const DiffHourCompareNow = (date?: string | Date) => {
  return Math.floor(dayjs().tz('Asia/Tokyo').diff(new Date(date), 'hours'));
};
