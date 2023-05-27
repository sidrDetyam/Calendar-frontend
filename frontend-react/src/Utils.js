
///TODO дичь

const addZero = val => {
    const str = val.toString()
    return str.length === 1 ? "0" + str : str
}

export function getCurrentLocalDateTimeStr(){
    const instant = new Date()
    return `${instant.getFullYear()}-${addZero(instant.getMonth())}-${addZero(instant.getDate())}T${addZero(instant.getHours())}:${addZero(instant.getMinutes())}`
}
