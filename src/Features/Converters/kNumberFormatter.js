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