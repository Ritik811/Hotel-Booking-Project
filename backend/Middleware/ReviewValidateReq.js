import { StatusCodes } from "http-status-codes";
import reviewSchemaValidator from "../validators/reviewValidators.js";

export const reviewValidate = (req, res, next) => {
  const result = reviewSchemaValidator.safeParse(req.body);

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
