//Error handller middleware
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const errors = err.errors || null;

  res.status(status).json({ message, errors });
};

//not found 404
const notFound = (req, res) => {
  res.status(404).json({ error: "Not Found" })
};

// logger digunakan untuk melakukan logging terhadap setiap request yang masuk ke server
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
}

export default {
  errorHandler,
  notFound,
  logger
}
