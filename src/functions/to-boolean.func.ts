export function ToBoolean (value: any) {
    if(typeof value != "string") return false
    
    return value.toLowerCase() === "true"
}