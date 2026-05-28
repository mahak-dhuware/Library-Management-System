const adminMiddleware = (req, res, next) => {

    if (req.user.role !== "admin") {
        res.status(403);
        throw new Error("Access denied. Admin only");
    }

    next();
};

module.exports = adminMiddleware;