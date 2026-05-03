
export function dateToCronExpression(passedDate: Date){

    const date = new Date(passedDate),
    
    minute = date.getUTCMinutes(),
    
    hour = date.getUTCHours(), 
    
    day_of_month = date.getUTCDate(),
    
    month = date.getUTCMonth(), 
    
    day_of_week = date.getUTCDay()

    return `${minute} ${hour} ${day_of_month} ${month} ${day_of_week}`
}