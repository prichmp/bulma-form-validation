
export default class FieldValidator
{
    public static notBlank = (value: string) => {
        return /\S/.test(value);
    };

    public static email = (value: string) => {
        return !FieldValidator.notBlank(value) || /^.+@.+\..+$/.test(value);
    };

    public static phone = (value: string) => {
        return !FieldValidator.notBlank(value) || /^(\d{3})?[- ]?\d{3}[- ]?\d{4}$/.test(value) && parseFloat(value) != NaN;
    }

    public static number = (value: string) => {
        return !FieldValidator.notBlank(value) || /^[+-][0-9.,]+$/.test(value) && parseFloat(value) != NaN;
    }

}