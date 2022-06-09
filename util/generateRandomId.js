const generateRandomId = (digitsLength = 6) => {
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = '';
    const charactersLength = char.length;
    for (let i = 0; i < digitsLength; i++) {
        result += char.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

module.exports = generateRandomId