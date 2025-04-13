import moment from 'moment-jalaali';

export function formatBackendDate(dateStr: string, locale: string) {
  console.log('dateStr', dateStr);
  if (!dateStr) return null;

  const isJalali = dateStr.startsWith('13') || dateStr.startsWith('14');

  if (locale === 'fa_IR') {
    // Persian UI → Calendar is Jalali
    if (isJalali) {
      return moment(dateStr, 'jYYYY-jMM-jDD');
    } else {
      // Backend sent Gregorian, convert to Jalali
      return moment(dateStr, 'YYYY-MM-DD').format('jYYYY-jMM-jDD');
    }
  } else {
    // English UI → Calendar is Gregorian
    if (isJalali) {
      // Convert Jalali to Gregorian
      const gDate = moment(dateStr, 'jYYYY-jMM-jDD').format('YYYY-MM-DD');

      return moment(gDate, 'YYYY-MM-DD');
    } else {
      // Already Gregorian
      return moment(dateStr, 'YYYY-MM-DD');
    }
  }
}
