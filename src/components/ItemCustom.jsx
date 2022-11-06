import React from "react";
import PropTypes from "prop-types";

export default function ItemCustom({
  index,
  id,
  className,
  title,
  date,
  handleClick,
  children
}) {
  return (
    <div
      className={className}
      id={id ? id : `item-${index}`}
      onClick={handleClick}
    >
      <div className="tool__steps--panel">
        <div className="tool__steps--panel-item index">{index}</div>
        <div className="tool__steps--panel-item title-date">
          <div className="tool__steps--panel-item title">{title}</div>
          <div className="tool__steps--panel-item date">
            <i className="fa fa-calendar" />
            <span>by: {date}</span>
          </div>
        </div>
        <div className="tool__steps--panel-item icon">
          <i className="fa fa-chevron-down" />
        </div>
      </div>
      <div className="tool__steps--content">{children}</div>
    </div>
  );
}

ItemCustom.propTypes = {
  handleClick: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
  date: PropTypes.string
};
