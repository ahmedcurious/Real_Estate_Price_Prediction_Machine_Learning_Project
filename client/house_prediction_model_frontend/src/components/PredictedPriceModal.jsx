import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button as MuiButton,
} from "@mui/material";
import PropTypes from "prop-types";

const PredictedPriceModal = ({ open, price, onClose }) => {
  const priceInLakhs = price * 100000;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Predicted Price</DialogTitle>
      <DialogContent>
        <div className="text-center">
          <h3 className="text-xl font-bold">
            Predicted Price for your property:
          </h3>
          <p className="mt-4 text-3xl font-semibold">
            {price ? `₹${priceInLakhs.toLocaleString()}` : "N/A"}
          </p>
        </div>
      </DialogContent>
      <DialogActions>
        <MuiButton onClick={onClose} color="primary">
          Close
        </MuiButton>
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
