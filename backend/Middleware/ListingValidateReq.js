import { listingValidationSchema } from "../validators/listingValidators.js";

export const listingValidate = (req, res, next) => {
  if (req.body.price) {
    req.body.price = Number(req.body.price);
  }

  const result = listingValidationSchema.safeParse(req.body);

  if (!result.success) {
    let errorMessage = "Validation failed";

    if (result.error && result.error.issues && result.error.issues.length > 0) {
      errorMessage = result.error.issues.map((err) => err.message).join(", ");
    } else if (result.error && typeof result.error.flatten === "function") {
      const flatErrors = result.error.flatten().fieldErrors;
      errorMessage = Object.values(flatErrors).flat().join(", ");
    }

    const error = new Error(errorMessage);
    error.statusCode = 400;
    return next(error);
  }

  req.body = result.data;
  next();
};
