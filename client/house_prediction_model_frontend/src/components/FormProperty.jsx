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
import React, { useState } from "react";
import Button from "./Button";
import PredictedPriceModal from "./PredictedPriceModal";
import Confetti from "react-confetti";

// Forward ref correctly to the form element
const FormProperty = React.forwardRef((props, ref) => {
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

  // Declare openModal state to control modal visibility
  const [openModal, setOpenModal] = useState(false);

  // Track confetti animation
  const [showConfetti, setShowConfetti] = useState(false);

  // Mutation for handling data submission
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

  // Handle form submission
  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting values:", values); // Log values for debugging
      const response = await mutation.mutateAsync(values); // Send the form values to backend
      setSubmitData(response); // Handle response
      setOpenModal(true); // Open the modal when prediction is successful
      setShowConfetti(true); // Trigger confetti animation
      setIsSubmitting(false); // End submitting state
    } catch (error) {
      setSubmitError(error); // Capture any errors
      setIsSubmitting(false); // End submitting state
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setShowConfetti(false); // Stop the confetti animation when the modal closes
  };

  return (
    <div className="flex flex-col justify-center items-center gap-16 py-16">
      <div className="text-teal-300 font-playfair_display font-bold text-5xl text-center w-fit">
        Please enter the Property details
      </div>
      <Formik
        initialValues={{ total_sqft: "", bhk: "", bath: "", location: "" }}
        onSubmit={async (values, formikHelpers) => {
          await handleSubmit(values); // Make sure to call handleSubmit with the form values
          formikHelpers.resetForm();
        }}
        validationSchema={object({
          total_sqft: number()
            .required("Please enter the required Area of the Property")
            .integer("Invalid Integer")
            .min(200, "Minimum Area must be 200 sqft and a positive number")
            .max(9000, "Maximum Area available is 9000 sqft"),
          bhk: number()
            .required("Please enter the number of rooms")
            .integer("Invalid Integer")
            .min(1, "Minimum BHK must be 1 and a positive number")
            .max(12, "Maximum BHK available is 12"),
          bath: number()
            .required("Please enter the number of baths")
            .integer("Invalid Integer")
            .min(1, "Minimum Bath must be 1 a positive number")
            .max(12, "Maximum Baths available is 12"),
          location: string().required(
            "Please select the location for the property"
          ),
        })}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form
            ref={ref}
            className="flex flex-col items-center gap-12 w-[448px]"
          >
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
                  {touched.location && errors.location ? errors.location : null}
                  {isLoading ? "Loading..." : null}
                  {error ? `Error: ${error.message}` : null}
                </FormHelperText>
              </FormControl>
            </div>
            <Button text="Predict Price!" type="submit" />
          </Form>
        )}
      </Formik>

      {isSubmitting && <p>Submitting...</p>}
      {submitError && <p>Error: {submitError.message}</p>}
      {/* {submitData && <p>Success: {JSON.stringify(submitData.estimated_price)}</p>} */}

      <PredictedPriceModal
        open={openModal}
        price={submitData ? submitData.estimated_price : null}
        onClose={handleCloseModal}
      />

      {/* Render the confetti animation behind the modal */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={500}
          recycle={true}
          gravity={0.3}
          colors={['#74ebd4', '#f1c40f', '#ff6347']}
          className="absolute top-0 left-0 z-[-1]"
        />
      )}
    </div>
  );
});

// Set the displayName to resolve the missing name warning
FormProperty.displayName = "FormProperty";

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
