import React, { Component } from "react";
import Button from "./components/Button";
import ItemCustom from "./components/ItemCustom";
import DatePicker from "./components/DatePicker";

const ONEDAY = 1000 * 60 * 60 * 24;
const TODAY = new Date();
const DATE_OPTIONS = { year: "numeric", month: "short", day: "numeric" };
const CURRENT_YEAR = TODAY.getFullYear();
const CURRENT_MONTH = TODAY.getMonth();
const CURRENT_DAY = TODAY.getDate();
const CURRENT_DATE = new Intl.DateTimeFormat("en-US", DATE_OPTIONS).format(
  TODAY
);
const NEXT_DAY = new Date(TODAY.setDate(CURRENT_DAY + 1));
const NEXT_DATE = new Intl.DateTimeFormat("en-US", DATE_OPTIONS).format(
  NEXT_DAY
);

// const warnStyles    = [
//     'color: white;',
//     'background-color: #E68137;'
// ].join(' '); /* DEBUG */

const inputClass = {
  default: "border border-info rounded-sm px-3 py-1",
  invalid: "border-danger",
  valid: "border-success",
};

export default class App extends Component {
  state = {
    isOpened: false,
    term: 1,
    errors: "",
    currentDate: CURRENT_DATE,
    fields: {
      starting: {
        title: "Starting on",
        id: "starting",
        name: "starting",
        className: inputClass.default,
        date: "",
        trueDate: TODAY,
        placeholder: CURRENT_DATE,
        showDatepicker: false,
      },
      ending: {
        title: "Ending on",
        id: "ending",
        name: "ending",
        className: inputClass.default,
        date: "",
        trueDate: NEXT_DAY,
        placeholder: NEXT_DATE,
        showDatepicker: false,
      },
    },
    steps: {
      understand: {
        id: "understand",
        title: "Understand your assignment",
        date: CURRENT_DATE,
        active: true,
        coef: 0.1,
        sumTime: 0,
        description: [
          "Read your assignment guidelines attentively. Pay special attention to the citation style, page limits, content requirements, and paper samples.",
          "If your topic is broad, then you need to narrow it down before you start your research. Otherwise, it will be difficult to address it in full.",
        ],
      },
      research: {
        id: "research",
        title: "Research the topic",
        date: CURRENT_DATE,
        active: false,
        coef: 0.05,
        sumTime: 0,
        description: [
          "Research the topic - study credible sources and collect information that addresses the discussed theme. You can find credible information in the SFU library or check scientific articles, open educational resources, Google Scholar, etc.",
          "Review the data you found and group them based on the main points addressed in each statement.",
        ],
        links: [
          {
            title: "SFU",
            url: "http://www.lib.sfu.ca/",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com/",
          },
        ],
      },
      write: {
        id: "write",
        title: "Write your outline",
        date: CURRENT_DATE,
        active: false,
        coef: 0.15,
        sumTime: 0,
        description: [
          "After grouping data, list the main sections / paragraphs you are going to cover in your paper.",
          "Each section should address a single idea and be backed up with facts, proven statements, pieces of evidence, which you can use to support your claims.",
        ],
      },
      prepare: {
        id: "prepare",
        title: "Prepare your draft",
        date: CURRENT_DATE,
        active: false,
        coef: 0.25,
        sumTime: 0,
        description: [
          "Develop an outline and expand your ideas into complete paragraphs. Writing your ideas down and solidifying the key points of your paper is enough since it is not the final writing.",
          "In case you are citing any source, make sure to mention its name and author.",
        ],
      },
      revise: {
        id: "revise",
        title: "Revise your draft",
        date: CURRENT_DATE,
        active: false,
        coef: 0.1,
        sumTime: 0,
        description: [
          "Check your draft carefully, paying special attention to its contents, structure, and argument formulations to clearly see its strengths and weaknesses.",
          "You can as well play around with the order of paragraphs and some formulations. Your main focus should be on generating convincing and straight-to-the-point content.",
          "Revise a draft as many times as needed to refine your arguments.",
        ],
      },
      finalize: {
        id: "finalize",
        title: "Finalize your references",
        date: CURRENT_DATE,
        active: false,
        coef: 0.15,
        sumTime: 0,
        description: [
          "Carefully check whether all sources are properly integrated and cited and no in-text citation is missing. This step is crucial for ensuring academic integrity of your work.",
        ],
      },
      editAndFormat: {
        id: "editAndFormat",
        title: "Edit and format your final draft",
        date: CURRENT_DATE,
        active: false,
        coef: 0.2,
        sumTime: 0,
        description: [
          "Do the final check of the paper: review its formatting and citation, pay attention to clarity and flow of your writing as well as a paper structure.",
          "Make sure there are no common punctuation, grammar, spelling, or word usage errors.",
          "Finally, check the paper for plagiarism and hand it in!",
        ],
      },
    },
  };

  /* DEBUG */
  // testHandle = (e) => {
  //     e.preventDefault();
  //     console.debug('%c [Warn] ', warnStyles, e.target.nodeName);
  // }

  changeBooleanValue(event, values, param, boolean = true, el_id = null) {
    const id = el_id ? el_id : event.currentTarget.id;

    Object.values(values).map((item) => {
      if (item.id !== id) {
        values[item.id][param] = !boolean;
        return this.setState({ values });
      } else {
        values[item.id][param] = boolean;
        return this.setState({ values });
      }
    });
  }

  accordionClick = (e) => {
    e.preventDefault();

    const id = e.currentTarget.id;
    let steps = this.state.steps;

    Object.values(steps).map((item) => {
      if (item.id === id) {
        steps[item.id]["active"] = !steps[item.id]["active"];
        return this.setState({ steps });
      }
      return;
    });
  };

  handleInputClick = (e) => {
    e.preventDefault();

    let fields = this.state.fields;

    if (!this.state.isOpened) {
      this.changeBooleanValue(e, fields, "showDatepicker");
    }
  };

  handleOutsideCalendar = (e) => {
    if (e.target === e.currentTarget) {
      let fields = this.state.fields;
      Object.values(fields).map((item) => {
        fields[item.id].showDatepicker = false; // Hide Calendar modal window
        return this.setState({ fields });
      });
    } else {
      return;
    }
  };

  handleDateSelect = (e) => {
    const parent = document
      .querySelector("[aria-label=Calendar]")
      .closest(".tool__datepicker");
    const parent_id = parent.getAttribute("data-id");
    const formatedDate = new Intl.DateTimeFormat("en-US", DATE_OPTIONS).format(
      e
    );

    let fields = this.state.fields;

    Object.values(fields).map((item) => {
      fields[item.id].showDatepicker = false; // Hide Calendar modal window
      this.setState({ fields });
      if (item.id === parent_id) {
        fields[item.id].date = formatedDate;
        fields[item.id].trueDate = new Date(e);
        return this.setState({ fields });
      }
      return;
    });
  };

  //=================
  calculateSteps(msPeriod, startDate) {
    const msStartDay = Date.parse(startDate);
    let sumMSTime = msStartDay;
    // Set SummarizeTime for every step
    let steps = this.state.steps;

    Object.values(steps).map((item, index) => {
      item = item.id;
      const coef = steps[item].coef;
      // Calculate spending time in ms for a Step
      const msTimeForStep = msPeriod * coef;

      // index === 0 ? sumMSTime += 0 : sumMSTime += msTimeForStep;
      sumMSTime += msTimeForStep;

      // Calculate next date for a next Step
      const nextDate = new Date(sumMSTime);
      const convertDate = new Intl.DateTimeFormat("en-US", DATE_OPTIONS).format(
        nextDate
      );

      steps[item].date = convertDate;
      return this.setState({ steps });
    });
  }
  //=================

  calculateResult() {
    const startDate = this.state.fields.starting.trueDate;
    const dateStart = startDate.getTime();
    const dateEnd = this.state.fields.ending.trueDate.getTime();
    const msDiff = dateEnd - dateStart;
    const dayDiff = msDiff / ONEDAY;

    if (dayDiff <= 0) {
      this.setState({
        errors: "Please, set Starting date greater than Ending date",
        term: 0,
      });
    } else {
      this.calculateSteps(msDiff, startDate);

      this.setState({
        isOpened: !this.state.isOpened,
        errors: "",
        term: Math.round(dayDiff),
      });
    }
  }

  handleResult = (e) => {
    e.preventDefault();

    if (!this.state.isOpened) {
      // Check if Start date is not Empty
      if (this.state.fields.starting.date !== "") {
        this.calculateResult();
      } else {
        this.setState({
          errors: "Please, set your Start Date",
        });
      }
    } else {
      this.setState({
        isOpened: !this.state.isOpened,
      });

      let fields = this.state.fields;
      Object.values(fields).map((item) => {
        fields[item.id].date = "";
        fields[item.id].trueDate = TODAY;
        return this.setState({ fields });
      });
    }
  };

  render() {
    const { fields, term, errors, isOpened, steps } = this.state;

    const daysName = term !== 1 ? "days" : "day";

    const calcButton = (
      <Button
        className="border border-0 rounded-sm bg-info my-3 px-3 py-1"
        handleClick={this.handleResult}
      >
        {!isOpened ? "Calculate" : "Clear All"}
      </Button>
    );

    const preText = (
      <p>
        According to the dates you have entered, <br />
        you have{" "}
        <strong>
          {term} {daysName}
        </strong>{" "}
        to finish.
      </p>
    );

    return (
      <div className="tool assignment-calculator">
        <form
          className={`tool__form ${isOpened ? "expanded" : ""}`}
          autoComplete="off"
        >
          {errors !== "" ? (
            <div className="formField__label">{errors}</div>
          ) : (
            ""
          )}
          <div className="flex">
            {Object.values(fields).map((item) => {
              return (
                <div className="my-3 flex-auto" key={item.id}>
                  <div className="text-muted">
                    <strong>{item.title}</strong>
                  </div>
                  <DatePicker
                    id={item.id}
                    name={item.name}
                    className={item.className}
                    placeholder={item.placeholder}
                    value={item.date}
                    minDate={
                      new Date(CURRENT_YEAR, CURRENT_MONTH, CURRENT_MONTH)
                    }
                    minDay={TODAY}
                    renderDatepicker={item.showDatepicker}
                    clickOutside={this.handleOutsideCalendar}
                    clickInput={this.handleInputClick}
                    dateSelect={this.handleDateSelect}
                  />
                </div>
              );
            })}
          </div>
          <div className={`tool__prefooter ${isOpened ? "two-columns" : ""}`}>
            <div className="my-3">{calcButton}</div>
            <div className="column column-text">{isOpened ? preText : ""}</div>
          </div>
          <footer className={`tool__footer ${isOpened ? "expanded" : ""}`}>
            {isOpened ? (
              <div className="tool__result">
                {Object.values(steps).map((item, index) => {
                  return (
                    <ItemCustom
                      key={index + 1}
                      id={item.id}
                      index={index + 1}
                      className={`tool__steps--item ${
                        item.active ? "active" : ""
                      }`}
                      handleClick={this.accordionClick}
                      title={item.title}
                      date={item.date}
                    >
                      <ul className="list-normal">
                        {item.description.map((item, index) => {
                          return (
                            <li className="list-item" key={index}>
                              {item}
                            </li>
                          );
                        })}
                      </ul>
                      {item.links ? (
                        <>
                          <h4 className="text-uppercase">References</h4>
                          <ul className="list-links">
                            {item.links.map((item, index) => {
                              return (
                                <li className="list-item" key={index}>
                                  <a href={item.url} className="list-link">
                                    <i className="fa fa-external-link" />{" "}
                                    {item.title}
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      ) : (
                        ""
                      )}
                    </ItemCustom>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </footer>
        </form>
      </div>
    );
  }
}
