
module.exports = (err, req, res, next) => {
    const httpStatus = err.status || 404;

    return res.status(httpStatus).send({
        status: httpStatus,
        message: err.message || "Route not found."
    });
};