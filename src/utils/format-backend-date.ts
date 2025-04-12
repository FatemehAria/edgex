import moment from 'moment-jalaali';

export function formatBackendDate(dateStr: string, locale: string) {
  if (!dateStr) return null;

  // Check if dateStr is in Jalali format
  const isJalali = /^1[34]\d{2}-\d{2}-\d{2}$/.test(dateStr); // Roughly detects years 1300-1499

  if (locale === 'fa_IR') {
    // Persian UI → Calendar is Jalali
    if (isJalali) {
      // All good, return Jalali moment
      return moment(dateStr, 'jYYYY-jMM-jDD');
    } else {
      // Backend sent Gregorian, convert to Jalali
      return moment(dateStr, 'YYYY-MM-DD').format('jYYYY/jMM/jDD');
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
