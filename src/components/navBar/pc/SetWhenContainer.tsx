// import SetWhen from "../SetWhen";

// const SetWhenContainer = () => {
//   return (
//     <div className="all absolute w-[50%] shadow-hardShadow rounded-20 p-7 bg-white top-[75px] left-[50%] translate-x-[-50%] z-20">
//       <SetWhen/>
//     </div>
//   );
// };

// export default SetWhenContainer
import { useEffect, useRef, useContext } from "react";
import SetWhen from "../SetWhen";
import { NavBarContext } from "@/components/ui/NavBar";

const SetWhenContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setSelected } = useContext(NavBarContext);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSelected("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="all absolute w-[50%] shadow-hardShadow rounded-20 p-7 bg-white top-[75px] left-[50%] translate-x-[-50%] z-20"
    >
      <SetWhen />
    </div>
  );
};

export default SetWhenContainer;
