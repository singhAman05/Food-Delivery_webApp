import * as Yup from "yup";

export const signupSchema = Yup.object({
  name: Yup.string().min(3).max(10).required("Please Enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  location: Yup.string().min(6).required("Please enter your location"),
  password: Yup.string().min(8).required("enter your password"),
});
