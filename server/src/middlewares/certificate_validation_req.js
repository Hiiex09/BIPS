export const validateCertificateRequest = (req, res, next) => {
  const allowedFields = ["certificate_type", "purpose", "contactNumber"];

  Object.keys(req.body).forEach((key) => {
    if (!allowedFields.includes(key)) {
      delete req.body[key];
    }
  });

  next();
};
