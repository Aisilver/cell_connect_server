export function TextCapitalizer (text: string) {
    const textToArray = text.split(""),
    
    firstCaharter = textToArray.shift()?.toUpperCase()

    return `${firstCaharter}${textToArray.join("")}`
}