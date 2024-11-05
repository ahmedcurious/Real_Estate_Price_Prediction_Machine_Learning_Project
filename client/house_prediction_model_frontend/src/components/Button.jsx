import PropTypes from "prop-types";

const Button = ({ text }) => {
  return (
    <button
      className="bg-teal-300 w-fit font-montserrat font-semibold text-white text-xl px-8 py-4 rounded-xl shadow-md
      hover:shadow-2xl hover:bg-teal-200"
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
};

export default Button;
