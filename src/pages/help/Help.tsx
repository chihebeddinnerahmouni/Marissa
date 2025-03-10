import CategoryComp from "@/components/help/CategoryComp";
import { useContext } from "react";
import { HelpContext } from "@/Layout/HelpLayout";
  import { LazyLoadImage } from "react-lazy-load-image-component";
  import "react-lazy-load-image-component/src/effects/blur.css";


const Help = () => {

  const { categories } = useContext(HelpContext);
  const image = "/listing-done.jpg"
  return (
    <div className="w-full">
      <LazyLoadImage
        alt="sea"
        effect="blur"
        src={image}
        width={"100%"}
        className="h-[300px] object-cover object-center"
      />

      <div className="grid gap-4 p-4 items-center max-w-[1200px] mx-auto md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category: any, index: number) => (
          <CategoryComp key={index} category={category} />
        ))}
      </div>
    </div>
  );
}

export default Help
