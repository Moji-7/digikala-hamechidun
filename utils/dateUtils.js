
export const convertDateToShamsi = (gregorianDate) => {
    const date = new Date(gregorianDate);
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      calendar: 'persian',
      numberingSystem: 'latn'
    };
    return new Intl.DateTimeFormat('fa-IR', options).format(date);
  }
  