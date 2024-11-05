import Button from "./Button";

const Header = () => {
  return (
    <div
      className="bg-cover bg-center h-screen flex"
      style={{
        backgroundImage:
          "url('./src/assets/brian-garrity-8UtXBV88wC4-unsplash.jpg')",
      }}
    >
      <div className="">
        <div>Accurate Home Price Predictions at Your Fingertips</div>
        <div>
          Curious about your home’s value or planning a property investment? Get
          data-driven price predictions tailored to your location, square
          footage, and home features, all in real-time.
        </div>
        <Button text="Start Prediction!" />
      </div>
    </div>
  );
};

export default Header;
