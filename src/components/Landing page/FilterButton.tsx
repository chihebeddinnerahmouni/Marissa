import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import FilterSheet from "@/containers/landing page/FilterSheet";
import Drawer from "@mui/material/Drawer";

const FilterButton = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <button
        className="w-[30px] h-[30px] lg:w-[37px] lg:h-[37px] rounded-50 flex justify-center items-center border-1 border-writingGrey text-writingGrey hover:border-main hover:text-main hover:shadow-hoverShadow"
        onClick={() => setIsSheetOpen(true)}
      >
        <CiFilter className="lg:text-[20px]" />
      </button>

      <Drawer
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(5px)",
          },
        }}
        anchor="left"
        open={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      >
        <FilterSheet
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
        />
      </Drawer>
    </>
  );
};

export default FilterButton;
