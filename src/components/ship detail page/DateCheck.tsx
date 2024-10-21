import CalendarCustom from "../ui/CalendarCustom";

const DateCheck = () => {
  
    return (
      <div className="w-full py-2 shadow-hardShadow rounded-20 mt-5 flex flex-col gap-3 items-center lg:mt-0">
        <div className="calendarContainer w-full h-[323px] xl:max-w-[550px]">
          <CalendarCustom />
        </div>
      </div>
    );
};

export default DateCheck;
