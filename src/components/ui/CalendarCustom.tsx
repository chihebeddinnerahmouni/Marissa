import { useState, useEffect, useRef } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { useTranslation } from "react-i18next";

const Test = () => {
  const { i18n, t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<any>();
  const inDemandDays = [new Date(2024, 10, 20), new Date(2024, 10, 25)];
  const reservedDays = [new Date(2024, 10, 22), new Date(2024, 10, 28)];
  const daysContainerRef = useRef<HTMLDivElement>(null);
  const monthYearRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    renderCalendar(currentDate);
  }, [currentDate, i18n.language]);

  console.log(selectedDate);
  const renderCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDayOfLastMonth = new Date(year, month, 0).getDate();
    const daysContainer = daysContainerRef.current;
    if (daysContainer) {
      daysContainer.innerHTML = "";

      for (let i = firstDayOfMonth; i > 0; i--) {
        const day = document.createElement("div");
        day.textContent = (lastDayOfLastMonth - i + 1).toString();
        day.classList.add("prev-month-day", "out-of-month");
        daysContainer.appendChild(day);
      }

      for (let i = 1; i <= lastDateOfMonth; i++) {
        const day = document.createElement("div");
        day.textContent = i.toString();

        if (i < date.getDate() || i > lastDateOfMonth) {
          day.classList.add("out-of-month");
        }

        const dayDate = new Date(date.getFullYear(), date.getMonth(), i);
        if (dayDate >= currentDate) {
          day.classList.add("selectable");
        }

        // Check if the day is in demand
        if (
          inDemandDays.some(
            (inDemandDay) =>
              inDemandDay.toDateString() === dayDate.toDateString()
          )
        ) {
          day.classList.add("inDemand");
        }
        // Check if the day is reserved
        if (
          reservedDays.some(
            (reservedDay) =>
              reservedDay.toDateString() === dayDate.toDateString()
          )
        ) {
          day.classList.add("reserved");
        }

        day.addEventListener("click", () => {
          if (dayDate >= currentDate) {
            // Find and remove 'selected' class from any element that has it
            const daysContainer = daysContainerRef.current;
            if (daysContainer) {
              const previouslySelected =
                daysContainer.querySelector(".selected");
              if (previouslySelected) {
                previouslySelected.classList.remove("selected");
              }
            }
            // Add 'selected' class to the newly clicked day
            day.classList.add("selected");
            setSelectedDate(dayDate);
          }
        });

        daysContainer.appendChild(day);
      }

      const totalDays = firstDayOfMonth + lastDateOfMonth;
      const nextDays = 7 - (totalDays % 7);

      if (nextDays < 7) {
        for (let i = 1; i <= nextDays; i++) {
          const day = document.createElement("div");
          day.textContent = i.toString();
          day.classList.add("next-month-day", "out-of-month");
          daysContainer.appendChild(day);
        }
      }

      const monthYear = monthYearRef.current;
      if (monthYear) {
        monthYear.textContent = `${date.toLocaleString(i18n.language, {
          month: "long",
        })} ${year}`;
      }
    }
  };

  const handlePrevMonth = () => {
    const newMonth = currentDate.getMonth() - 1;
    const newYear =
      newMonth < 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
    const newDate = new Date(newYear, (newMonth + 12) % 12, 1);

    // Get the current real date
    const currentRealDate = new Date();
    const currentRealMonth = currentRealDate.getMonth();
    const currentRealYear = currentRealDate.getFullYear();

    // Render the calendar for the new date
    renderCalendar(newDate);

    // Disable days before today and add 'out-of-month' class if necessary
    const days = daysContainerRef.current?.querySelectorAll("div");
    days?.forEach((day) => {
      const dayDate = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        parseInt(day.textContent || "0")
      );
      if (dayDate < currentRealDate) {
        day.classList.remove("selectable");
        day.classList.add("out-of-month");
        day.removeEventListener("click", handleDayClick);
      }
      // Add 'out-of-month' class if the new month and year match the current real month and year
      if (
        newDate.getMonth() === currentRealMonth &&
        newDate.getFullYear() === currentRealYear
      ) {
        day.classList.add("out-of-month");
      }
    });
    setCurrentDate(newDate);
    renderCalendar(newDate);
  };

  const handleDayClick = (event: Event) => {
    const day = event.target as HTMLDivElement;
    const dayDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      parseInt(day.textContent || "0")
    );
    if (dayDate >= new Date()) {
      console.log("Day clicked:", dayDate);
    }
  };

    const handleNextMonth = () => {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
      );
    };

  return (
    <div className="calendar">
      <div className="calendar-header">
        {!(
          currentDate.getMonth() == new Date().getMonth() &&
          currentDate.getFullYear() == new Date().getFullYear()
        ) && (
          <button id="prev-month" onClick={handlePrevMonth}>
            {i18n.language === "en" ? <GrFormPrevious /> : <GrFormNext />}
          </button>
        )}
        <h2 className="month-year" ref={monthYearRef}></h2>
        <button onClick={handleNextMonth}>
          {i18n.language === "en" ? <GrFormNext /> : <GrFormPrevious />}
        </button>
      </div>
      <div className="calendar-body">
        <div className="day-names">
          <div>{t("sun")}</div>
          <div>{t("mon")}</div>
          <div>{t("tue")}</div>
          <div>{t("wed")}</div>
          <div>{t("thu")}</div>
          <div>{t("fri")}</div>
          <div>{t("sat")}</div>
        </div>
        <div className="days" ref={daysContainerRef}></div>
      </div>
    </div>
  );
};

export default Test;
