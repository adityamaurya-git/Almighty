export const isToday = (timestamp) => {

    if (!timestamp) return false;
    const date = timestamp.toDate();
    const today = new Date();
    return date.toDateString() === today.toDateString();
    
};