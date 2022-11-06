import React from "react";
import PropTypes from "prop-types";
import InfiniteCalendar from "react-infinite-calendar";
import "react-infinite-calendar/styles.css";

export default function DatePicker({
  id,
  name,
  className,
  value,
  placeholder,
  minDate,
  minDay,
  clickInput,
  clickOutside,
  dateSelect,
  renderDatepicker
}) {
  const calendar = {
    width: window.innerWidth < 576 ? window.innerWidth - 30 : 420,
    height: window.innerWidth < 576 ? window.innerHeight - 280 : 500,
    theme: {
      selectionColor: "rgb(92, 143, 239)",
      textColor: {
        default: "#333",
        active: "#FFF"
      },
      weekdayColor: "rgb(110, 155, 240)",
      headerColor: "rgb(92, 143, 239)",
      floatingNav: {
        background: "rgba(42, 103, 219, 0.96)",
        color: "#FFF",
        chevron: "transparent"
      }
    }
  };

  return (
    <>
      <div className="formField with-icon">
        <input
          id={id}
          className={className}
          name={name}
          placeholder={placeholder}
          value={value}
          onClick={clickInput}
          type="text"
          readOnly
        />
        <i className="fa fa-calendar formField__icon" />
      </div>
      <div
        className={`tool__datepicker ${renderDatepicker ? "show" : ""}`}
        data-id={id}
        onClick={clickOutside}
      >
        {renderDatepicker ? (
          <div className="tool__datepicker--modal">
            <InfiniteCalendar
              onSelect={dateSelect}
              min={minDate}
              minDate={minDay}
              width={calendar.width}
              height={calendar.height}
              theme={calendar.theme}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

DatePicker.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  plcaeholder: PropTypes.string,
  minDay: PropTypes.object,
  minDate: PropTypes.object,
  clickInput: PropTypes.func,
  dateSelect: PropTypes.func,
  clickOutside: PropTypes.func,
  renderDatepicker: PropTypes.bool.isRequired
};

DatePicker.defaultProps = {
  name: "date",
  className: "tool__input datepicker",
  renderDatepicker: false,
  placeholder: "21.11.2019"
};
