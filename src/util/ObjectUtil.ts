export const notNulltext = (text: string | undefined | null) => {
    if (text !== undefined && text !== null) {
        return text;
    } return ''
}