import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";
import Button from "./Button";

const PredictedPriceModal = ({ open, price, onClose }) => {
  const priceInLakhs = price * 100000;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "500px", // Optional: Adjust width
          borderRadius: "10px", // Optional: Rounded corners
          padding: "20px", // Padding around the content
          border: "2px solid #74ebd4 !important", // Adding !important to ensure the border is applied
          boxShadow: "none !important", // Remove default box-shadow that might interfere with border
          overflow: "visible", // Ensure that the border is not clipped
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "36px",
          fontWeight: "bold",
          fontFamily: ["Playfair Display", "serif"],
          color: "#74ebd4",
          paddingBottom: "16px",
          textAlign: "center",
        }}
      >
        Predicted Price
      </DialogTitle>

      <DialogContent
        sx={{
          textAlign: "center",
          paddingTop: "16px",
          paddingBottom: "16px",
        }}
      >
        <div className="text-center">
          <h3 className="text-xl font-montserrat font-light">
            Predicted Price for your property:
          </h3>
          <p className="mt-4 text-3xl font-montserrat font-semibold text-slate-500">
            {price ? `₹${priceInLakhs.toLocaleString()}` : "N/A"}
          </p>
        </div>
      </DialogContent>

      <DialogActions
        sx={{
          paddingTop: "10px",
          paddingBottom: "10px",
          justifyContent: "center",
        }}
      >
        <Button text="Close" onClick={onClose} />
      </DialogActions>
    </Dialog>
  );
};

PredictedPriceModal.propTypes = {
  open: PropTypes.bool,
  price: PropTypes.number,
  onClose: PropTypes.func,
};

export default PredictedPriceModal;
