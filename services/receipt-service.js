let receipt64 = '';

function set(value) {
    receipt64 = value;
}

function get() {
    return 'data:image/png;base64,' + receipt64;
}

function clear() {
    receipt64 = '';
}

module.exports = {
    set, get, clear
};