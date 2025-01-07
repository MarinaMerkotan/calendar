export const isToday = (year, month, day) => {
  const today = new Date();
  return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
};

export const getFirstDayOfMonth = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  return firstDay === 0 ? 6 : firstDay - 1;
};

export const getLastDateOfMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getAllDaysOfMonth = (year, month) => {
  const lastDateOfMonth = getLastDateOfMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const days = Array.from({ length: lastDateOfMonth }, (_, i) => ({
    day: i + 1,
    active: true,
  }));

  for (let i = 0; i < firstDayOfMonth; i++) {
    const lastDateOfPrevMonth = getLastDateOfMonth(year, month - 1);
    days.unshift({ day: lastDateOfPrevMonth - i, active: false });
  }

  const count = 42 - days.length;
  for (let i = 0; i < count; i++) {
    days.push({ day: i + 1, active: false });
  }

  return days;
};
