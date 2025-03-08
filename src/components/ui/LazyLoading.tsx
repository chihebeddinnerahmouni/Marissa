
const LazyLoading = () => {

  const image = "/logo.png";

  return (
    <div className="w-full h-screen flex justify-center items-center animate-pulse">
      <img src={image} alt="logo" className="w-20 animate-pulse" />
    </div>
  );
};

export default LazyLoading;
