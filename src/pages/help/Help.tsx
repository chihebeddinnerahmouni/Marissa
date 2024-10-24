import CategoryComp from "@/components/help/CategoryComp";
import categories from "@/assets/files/help/categories";





const Help = () => {



  return (
    <div className="w-full">
      <img
        src="https://getmyboat.zendesk.com/hc/theming_assets/01HZPJJZNAV3WPGYNSJCZBN9T9"
        alt="sea"
        className="w-full h-[300px] object-cover object-center"
      />

      <div className="categories w-full px-5 mt-10 grid grid-cols-1 gap-5 lg:px-[180px] lg:grid-cols-2 lg:mt-14 lg:gap-8 xl:px-[220px] 2xl:max-w-[1300px] 2xl:mx-auto 2xl:px-0 ">
        {categories.map((category, index) => (
          <CategoryComp key={index} index={index} category={category} />
        ))}
      </div>
    </div>
  );
}

export default Help
