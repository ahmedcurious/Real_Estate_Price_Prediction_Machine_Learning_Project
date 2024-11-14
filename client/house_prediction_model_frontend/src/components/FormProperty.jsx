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
import { useQuery } from "@tanstack/react-query";
import Button from "./Button";

const FormProperty = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:5000/get_location_names");
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="flex flex-col justify-center items-center gap-16 py-16">
      <div className="text-teal-300 font-playfair_display font-bold text-5xl text-center w-fit">
        Please enter the Property details
      </div>
      <Formik
        initialValues={{ area: "", bhk: "", bath: "", location: "" }}
        onSubmit={(values, formikHelpers) => {
          console.log(values);
          formikHelpers.resetForm();
        }}
        validationSchema={object({
          area: number()
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
          <Form className="flex flex-col items-center gap-12">
            <div className="flex flex-col gap-9">
              <Field
                name="area"
                type="number"
                as={TextField}
                variant="outlined"
                color="primary"
                label="Area (Square Feet)"
                fullWidth
                error={Boolean(errors.area) && Boolean(touched.area)}
                helperText={Boolean(touched.area) && errors.area}
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
                    <MenuItem key={index} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Field>
                {touched.location && errors.location && (
                  <FormHelperText>{errors.location}</FormHelperText>
                )}
              </FormControl>
            </div>
            <Button text="Predict Price!" type="Submit" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormProperty;
