/**
 * Formatting the datetime class
 * Getting date time by passing a parameter on the format needed
 * @param 'DD/MM/YYYY/HH/MM/SS' or empty
 * Otherwise will bring everything by default
 * For the locale, pass the locale you need, and style e.g. formatter.formatLocale('en-GB', {dateStyle: 'full'})
 * Defaulted to 'en-US'
 */
export class DateFormatter {
    private date: Date;

    constructor(date?: string | Date) {
        this.date = date ? new Date(date) : new Date();
    }

    format(pattern: string = 'YYYY-MM-DD HH:MM:SS'): string {
        const year = this.date.getFullYear();
        const month = String(this.date.getMonth() + 1).padStart(2, '0');
        const day = String(this.date.getDay().toString().padStart(2, '0'));
        const hours = String(this.date.getHours().toString().padStart(2, '0'));
        const minutes = String(this.date.getMinutes().toString().padStart(2, '0'));
        const seconds = String(this.date.getSeconds().toString().padStart(2, '0'));

        return pattern
            .replace('YYYY', year.toString())
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('MM', minutes)
            .replace('SS', seconds)
    }

    formatLocale(locale: string = 'en-US', options?: Intl.DateTimeFormatOptions): string {
        return this.date.toLocaleString(locale, options);
    }

    setDate(date: string | Date) {
        this.date = new Date(date);
    }
}