export const capitalizeFirstLetter = (string: string | undefined) => {
    if (string !== undefined) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    else {
        return '';
    }
}