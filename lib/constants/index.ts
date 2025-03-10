export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "BuyMore";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "A modern ecommerce platform built with nextJs";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const LATEST_PRODUCT_LIMIT =
  Number(process.env.LATEST_PRODUCT_LIMIT) || 4;
export const signInDefaulValues = {
  email: "admin@example.com",
  password: "123456",
};
export const signUpDefaulValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
