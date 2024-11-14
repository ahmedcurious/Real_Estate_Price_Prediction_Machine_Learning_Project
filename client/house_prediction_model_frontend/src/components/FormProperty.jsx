import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { object, number, string } from "yup";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Button from "./Button";

const FormProperty = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:5000/get_location_names");
      return response.json();
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitData, setSubmitData] = useState(null);

  // Define the mutation with the correct useMutation API
  const mutation = useMutation({
    mutationFn: postData,
    onSuccess: (data) => {
      setSubmitData(data);
      setIsSubmitting(false);
    },
    onError: (error) => {
      setSubmitError(error);
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting values:", values); // Log values for debugging
      const response = await mutation.mutateAsync(values); // Send the form values to backend
      setSubmitData(response); // Handle response
      setIsSubmitting(false); // End submitting state
    } catch (error) {
      setSubmitError(error); // Capture any errors
      setIsSubmitting(false); // End submitting state
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-16 py-16">
      <div className="text-teal-300 font-playfair_display font-bold text-5xl text-center w-fit">
        Please enter the Property details
      </div>
      <Formik
        initialValues={{ total_sqft: "", bhk: "", bath: "", location: "" }}
        onSubmit={(values, formikHelpers) => {
          handleSubmit(values); // Make sure to call handleSubmit with the form values
          formikHelpers.resetForm();
        }}
        validationSchema={object({
          total_sqft: number()
            .required("Please enter the required Area of the Property")
            .integer("Invalid Integer")
            .min(0, "Area must be a positive number")
            .max(9000, "Maximum Area available is 9000 sqft"),
          bhk: number()
            .required("Please enter the number of rooms")
            .integer("Invalid Integer")
            .min(0, "BHK must be a positive number")
            .max(14, "Maximum BHK available is 14"),
          bath: number()
            .required("Please enter the number of baths")
            .integer("Invalid Integer")
            .min(0, "Bath must be a positive number")
            .max(14, "Maximum Baths available is 14"),
          location: string().required(
            "Please select the location for the property"
          ),
        })}
      >
        {({ values, handleChange, errors, touched }) => (
          <div>
            <Form className="flex flex-col items-center gap-12">
              <div className="flex flex-col gap-9">
                <Field
                  name="total_sqft"
                  type="number"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Area (Square Feet)"
                  fullWidth
                  error={
                    Boolean(errors.total_sqft) && Boolean(touched.total_sqft)
                  }
                  helperText={Boolean(touched.total_sqft) && errors.total_sqft}
                />
                <div className="flex flex-row gap-12">
                  <Field
                    name="bhk"
                    type="number"
                    as={TextField}
                    variant="outlined"
                    color="primary"
                    label="BHK"
                    fullWidth
                    error={Boolean(errors.bhk) && Boolean(touched.bhk)}
                    helperText={Boolean(touched.bhk) && errors.bhk}
                  />
                  <Field
                    name="bath"
                    type="number"
                    as={TextField}
                    variant="outlined"
                    color="primary"
                    label="Bath"
                    fullWidth
                    error={Boolean(errors.bath) && Boolean(touched.bath)}
                    helperText={Boolean(touched.bath) && errors.bath}
                  />
                </div>
                <FormControl
                  fullWidth
                  error={touched.location && Boolean(errors.location)}
                >
                  <InputLabel id="location-select-label">Location</InputLabel>
                  <Field
                    name="location"
                    as={Select}
                    labelId="location-select-label"
                    id="location-select"
                    label="Location"
                    value={values.location}
                    onChange={handleChange}
                  >
                    {data?.locations?.map((location, index) => (
                      <MenuItem key={index} value={`location_${location}`}>
                        {location}
                      </MenuItem>
                    ))}
                  </Field>
                  <FormHelperText>
                    {touched.location && errors.location
                      ? errors.location
                      : null}
                    {isLoading ? "Loading..." : null}
                    {error ? `Error: ${error.message}` : null}
                  </FormHelperText>
                </FormControl>
              </div>
              <Button text="Predict Price!" type="Submit" />
            </Form>

            {isSubmitting && <p>Submitting...</p>}
            {submitError && <p>Error: {submitError.message}</p>}
            {submitData && <p>Success: {JSON.stringify(submitData)}</p>}
          </div>
        )}
      </Formik>
    </div>
  );
};

async function postData(values) {
  const response = await fetch("http://127.0.0.1:5000/predict_price", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return response.json();
}

export default FormProperty;
