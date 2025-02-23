//Formatter function for turning 1000s into Ks(eg.3000 = 3k)
const kNumberFormatter = (num) => {
    let formatConverter;
    if (num >= 1000) {
        formatConverter = (num / 1000).toFixed(1) + 'K';
        return formatConverter;
    } else {
        return num;
    }
};

export default kNumberFormatter;