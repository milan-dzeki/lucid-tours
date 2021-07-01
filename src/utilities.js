import TourGuides from "./components/About/TourGuides/TourGuides";

export const setupTourGuides = (guideType, guideClassname, guideTitle) => {
    return <TourGuides
      guidesClassname={guideClassname}
      guidesTitle={guideTitle}
      guidesPeople={guideType} />
  };

  // get name of the months
  export const getMonths = () => {
    let monthNumber = new Date().getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    let actualMonth = monthNames[monthNumber];

    return { actualMonth, monthNumber };
  };

  // get present date, month and month names
  export const getDateAndMonths = () => {
    let presentDay = new Date().getDate();
    let presentMonth = new Date().getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return {
      presentDay,
      presentMonth,
      monthNames,
    };
  };

  // split and order date pattern info
  export const orderDateInfo = (date) => {
    let tourDate = date;
    let tourDateHalves = tourDate.split(" - ");
    let tourDateFirstHalf = tourDateHalves[0].split(" ");
    let tourDateSecondHalf = tourDateHalves[1].split(" ");
    let tourMonth = tourDateFirstHalf[0];

    let tourDateOne = tourDateFirstHalf[1].slice(0, -2);
    let tourDateTwo = tourDateSecondHalf[1].slice(0, -2);

    return {
      tourMonth,
      tourDateOne,
      tourDateTwo
    };
  };

  // get dates and tour date info
  export const datesInfo = (tour = null) => {
    const {presentDay, presentMonth, monthNames} = getDateAndMonths();

    const {tourMonth, tourDateOne, tourDateTwo} = orderDateInfo(tour.tourDate);
    
    return {
      presentDay,
      presentMonth,
      monthNames,
      tourMonth,
      tourDateOne,
      tourDateTwo
    };
  };

  // FORMS UTILS
  // get select input config
  export const getSelectInputConfig = (elementId, labelText, selectOptions, defValue, inputDisabled, inputChangedHandler, validationRequired) => {
    return {
      id: elementId,
      elementType: "select",
      elementConfig: {
        label: {
          for: elementId,
          name: labelText
        },
        atributes: {
          name: elementId
        },
        options: selectOptions
      },
      value: "",
      defaultValue: defValue,
      disabled: inputDisabled,
      onChangeHandler: inputChangedHandler,
      validation: {
        required: validationRequired
      },
      touched: false,
      valid: false
    };
  };