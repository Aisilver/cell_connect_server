
export function dateToCronExpression(date: Date){

    const minute = date.getMinutes(),
    
    hour = date.getHours(), 
    
    day_of_month = date.getDate(),
    
    month = date.getMonth(), 
    
    day_of_week = date.getDay()

    return `${minute} ${hour} ${day_of_month} ${month} ${day_of_week}`
}