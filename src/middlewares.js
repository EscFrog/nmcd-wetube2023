export const localsMiddleware = (req, res, next) => {
  // session에 저장된 값을 각각 로컬저장소에 저장한다. 이 값은 이제 모든 템플릿에서 가져다 쓸 수 있다.
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user;
  next();
};
