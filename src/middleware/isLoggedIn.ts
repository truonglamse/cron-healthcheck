export function isAdminLoggedIn(req: any, res: any, next: any) {
  if (req.isAuthenticated() && req.session.userEmail == "admin") {
    return next();
  }
  res.status(401).json({ sucess: false, error: "User not authorized" })
}

export function isLoggedIn(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ success: false, error: "User not authorized" })
}
