/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";

const SUPPORTED_IMAGE_FORMATS = ["image/jpeg", "image/png", "image/webp"];

const fileValidation = yup
  .mixed()
  .required("Cover image is required")
  .test("fileType", "Unsupported file format", (value: any) => {
    if (!value) return false;
    return SUPPORTED_IMAGE_FORMATS.includes(value.type);
  });

const fileArrayValidation = yup
  .array()
  .of(
    yup.mixed().test("fileType", "Unsupported file format", (value: any) => {
      if (!value) return false;
      return SUPPORTED_IMAGE_FORMATS.includes(value.type);
    })
  )
  .max(5, "You can upload up to 5 images")
  .required("Images are required");

const productInputSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  description: yup.string().optional(),
  category: yup.string().required("Category is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be a positive number")
    .required("Price is required"),
  coverImage: fileValidation,
  images: fileArrayValidation,
});

export default productInputSchema;
