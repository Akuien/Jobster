module.exports = class newError extends Error {
    constructor(message, errorStatusCode) {
        super(message);

        this.errorStatusCode = errorStatusCode;
    }
}