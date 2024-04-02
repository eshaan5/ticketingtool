function checkSuperAdmin(req, res, next) {
  if (req.user.role !== "superAdmin") {
    return res.status(403).send("Forbidden");
  }
  next();
}

function checkAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).send("Forbidden");
  }
  next();
}

function checkPermission (permission) {
  return function (req, res, next) {
    if (!req.user.permissions[permission]) {
      return res.status(403).send("Forbidden");
    }
    next();
  };
}

module.exports = {
  checkSuperAdmin,
  checkAdmin,
  checkPermission,
};
