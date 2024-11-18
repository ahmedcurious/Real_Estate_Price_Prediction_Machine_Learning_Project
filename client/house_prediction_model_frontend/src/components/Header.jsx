import Button from "./Button";
import PropTypes from "prop-types";

const Header = ({onScrollToForm}) => {
  return (
    <div
      className="bg-cover bg-center h-screen flex items-center"
      style={{
        backgroundImage:
          "url('./src/assets/brian-garrity-8UtXBV88wC4-unsplash.jpg')",
      }}
    >
      <div
        className="sm:mx-auto h-fit bg-custom-gradient border-solid border-2 border-slate-300 px-8 py-8 box-border
        flex flex-col gap-12 rounded-3xl shadow-xl backdrop-blur animate-pulse" 
      >
        <div className="font-playfair_display font-bold text-white text-center text-6xl text-wrap leading-[4rem]">
          Accurate Home Price
          <br />
          Predictions at Your Fingertips
        </div>
        <div className="h-fit flex flex-col gap-6 items-center ">
          <div className="font-playfair_display font-normal text-white text-center text-4xl text-wrap leading-normal">
            Curious about your home’s value or planning a property investment?
            <br />
            Get data-driven price predictions tailored to your location,
            <br />
            square footage, and home features, all in real-time.
          </div>
          <Button text="Start Prediction!" onClick={onScrollToForm} />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  onScrollToForm: PropTypes.func
}

export default Header;
