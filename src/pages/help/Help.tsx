import CategoryComp from "@/components/help/CategoryComp";
import { useContext } from "react";
import { HelpContext } from "@/Layout/HelpLayout";


const Help = () => {


  const { categories } = useContext(HelpContext);

  return (
    <div className="w-full">
      <img
        src="https://getmyboat.zendesk.com/hc/theming_assets/01HZPJJZNAV3WPGYNSJCZBN9T9"
        alt="sea"
        className="w-full h-[300px] object-cover object-center"
      />

      <div className="flex flex-col md:flex-row gap-4 p-4 items-center max-w-[1200px] mx-auto">
        {categories.map((category: any, index: number) => (
          <CategoryComp key={index} category={category} />
        ))}
      </div>
    </div>
  );
}

export default Help
