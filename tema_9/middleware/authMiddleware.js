function authMiddleware(req, res, next) {
  console.log("Sesión actual:", req.session.user);
  if (!req.session.user) {
    return res.status(401).send("Acceso denegado, debe registrarse primero para acceder");
  }
  next();
}
  
module.exports = authMiddleware;
