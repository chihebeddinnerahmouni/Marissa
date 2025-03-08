// import { zoomies } from 'ldrs'






const LoadingLine = () => {
  // zoomies.register()
  
  const image = "/logo.png"

  return (
    <div className="w-full h-full flex justify-center items-center animate-pulse">
      {/* <l-zoomies
        size="80"
        stroke="5"
        bg-opacity="0.1"
        speed="1.4"
        color="#FF385C"
      ></l-zoomies> */}
      <img src={image} alt="logo" className="w-20" />
    </div>
  );
}

export default LoadingLine
