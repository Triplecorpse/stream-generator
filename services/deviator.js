module.exports = (value, deviation) => {
    const devValue = (Math.random() * deviation);
    const sign = Math.sign(Math.random() - 0.5);

    return value + sign * devValue;
};