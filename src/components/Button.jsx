import React from "react";
import PropTypes from "prop-types";

export default function Button({
  isLoading,
  name,
  disabled,
  handleClick,
  className,
  type,
  customLoader,
  children
}) {
  const loader = customLoader ? (
    customLoader
  ) : (
    <div className="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />
    </div>
  );

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={handleClick}
      type={type}
    >
      {isLoading ? loader : children || name}
    </button>
  );
}

Button.propTypes = {
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string
};

Button.defaultProps = {
  name: "Button"
};
