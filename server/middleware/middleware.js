const portInfo = (req, res, next) => {
  console.log("New request made:")
  console.log("Host: " + req.hostname)
  console.log("Request: " + req.method)
  next();
};

export default portInfo;
