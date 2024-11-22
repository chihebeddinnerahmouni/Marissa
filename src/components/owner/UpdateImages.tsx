import ReactModal from "react-modal";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaMinusCircle, FaCamera } from "react-icons/fa";
import LoadingButton from "@/components/ui/LoadingButton";

interface UpdatePricesProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  images: any;
}

const UpdateImages: React.FC<UpdatePricesProps> = ({ setIsOpen, images }) => {
  const { t } = useTranslation();
  const [imageList, setImageList] = useState<any[]>(images);
  const { myBoatId } = useParams<{ myBoatId: string }>();
  const [loading, setLoading] = useState(false);
  const urlList = import.meta.env.VITE_SERVER_URL_LISTING;

  

  // Remove image from imageList
  const removeImage = (index: number) => {
    const newImageList = imageList.filter((_, i) => i !== index);
    setImageList(newImageList);
  };

  // Add images to imageList (for manual upload)
  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files).map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setImageList([...imageList, ...newImages]);
    }
  };



  // Submit images
const handleContinue = async () => {
  if (imageList.length < 5) {
    Swal.fire({
      title: t("oops"),
      text: t("please_add_at_least_5_images"),
      timer: 3000,
      timerProgressBar: true,
      width: 400,
      customClass: {
        confirmButton: "custom-confirm-button",
      },
    });
    return;
  }

  setLoading(true);




  const formData = new FormData();
  for (const image of imageList) {
    if (image.id) {
      const response = await fetch(`${urlList}/${image.url}`);
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });
      formData.append("images", file);
    } else {
      formData.append("images", image.file);
    }
  }

  try {
    await axios.put(`${urlList}/api/listing/listings/${myBoatId}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    Swal.fire({
      title: t("great"),
      text: t("prices_updated_successfully"),
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
      customClass: {
        confirmButton: "custom-confirm-button",
      },
    });
    window.location.reload();
  } catch (err: any) {
    console.log(err.response.data);
    setLoading(false);
    Swal.fire({
      title: t("oops"),
      text: t("something_went_wrong_try_again"),
      icon: "error",
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        confirmButton: "custom-confirm-button",
      },
    });
  }
};

  // console.log(imageList);
  return (
    <ReactModal
      isOpen={true}
      onRequestClose={() => setIsOpen(false)}
      className="flex flex-col items-center justify-center w-full bg-white p-3 rounded-10 shadow-hardShadow md:w-[500px]"
      overlayClassName="fixed inset-0 backdrop-blur-[7px] bg-opacity-20 bg-black z-20 flex items-center justify-center px-4"
    >
      <p className="mb-5 text-[25px] font-bold">{t("update_images")}</p>
      <div className="grid grid-cols-3 gap-4 w-full max-h-[400px] overflow-auto">
        {imageList.map((image: any, index: number) => (
          <div key={index} className="relative">
            <img
              src={image.id ? `${urlList}/${image.url}` : image.url}
              // src={image.url}
              alt={`Boat image ${index + 1}`}
              className="w-full h-24 md:h-32 object-cover object-center rounded-lg shadow-sm"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 left-2 text-red-500 text-xl"
            >
              <FaMinusCircle />
            </button>
          </div>
        ))}
        <label className="relative flex items-center justify-center w-full h-24 md:h-32 bg-gray-200 rounded-lg shadow-sm cursor-pointer">
          <FaCamera className="text-gray-500 text-2xl" />
          <input
            type="file"
            multiple
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleAddImage}
          />
        </label>
      </div>
      <button
        onClick={handleContinue}
        disabled={loading}
        className="w-full h-10 bg-main text-white rounded-lg shadow-md hover:bg-mainHover transition duration-200 ease-in-out mt-5"
      >
        {/* {t("save")} */}
        {loading ? <LoadingButton /> : t("save")}
      </button>
    </ReactModal>
  );
};

export default UpdateImages;



// const handleContinue = async () => {
//     if (imageList.length < 5) {
//       Swal.fire({
//         title: t("oops"),
//         text: t("please_add_at_least_5_images"),
//         timer: 3000,
//         timerProgressBar: true,
//         width: 400,
//         customClass: {
//           confirmButton: "custom-confirm-button",
//         },
//       });
//       return;
//     }

//     setLoading(true);

//     const formData = new FormData();
//       const allowedFileTypes = /jpeg|jpg|png/;

//  for (const image of imageList) {
//    if (image.id) {
//      const response = await fetch(image.url);
//      const blob = await response.blob();
//      formData.append("images", blob, "photo.jpg");
//    } else {
//      formData.append("images", image.file);
//    }
//     }
    
//         // Check file type
//     if (allowedFileTypes.test(file.type)) {
//       formData.append("images", file, "photo.jpg");
//     } else {
//       console.error("Unsupported file type:", file.type);
//     }
//   }

    // Send form data to the server
    // axios
    //   .put(`${urlList}/api/listing/listings/${myBoatId}`, formData, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    //     },
    //   })
    //   .then(() => {
    //     Swal.fire({
    //       title: t("great"),
    //       text: t("prices_updated_successfully"),
    //       icon: "success",
    //       timer: 2000,
    //       showConfirmButton: false,
    //       timerProgressBar: true,
    //       customClass: {
    //         confirmButton: "custom-confirm-button",
    //       },
    //     });
    //     setIsOpen(false); // Close modal after success
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data);
    //     setLoading(false);
    //     Swal.fire({
    //       title: t("oops"),
    //       text: t("something_went_wrong_try_again"),
    //       icon: "error",
    //       timer: 2000,
    //       timerProgressBar: true,
    //       customClass: {
    //         confirmButton: "custom-confirm-button",
    //       },
    //     });
    //   });
  // };








// import ReactModal from "react-modal";
// import { useTranslation } from "react-i18next";
// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { FaMinusCircle, FaCamera } from "react-icons/fa";
// import LoadingButton from "@/components/ui/LoadingButton";

// interface UpdatePricesProps {
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   images: any;
// }

// const UpdateImages: React.FC<UpdatePricesProps> = ({ setIsOpen, images }) => {
//   const { t } = useTranslation();
//   const [imageList, setImageList] = useState<any[]>([]);
//   const { myBoatId } = useParams<{ myBoatId: string }>();
//   const [loading, setLoading] = useState(false);
//   const urlList = import.meta.env.VITE_SERVER_URL_LISTING;

//   // Fetch images and ensure we have at least 5 images
// useEffect(() => {
//   const loadImages = async () => {
//     const updatedImages = await Promise.all(
//       images.map(async (image: any, i: number) => {
//         if (!image.file && image.url) {
//           const { file, blobUrl } = await urlToFile(
//             image.url,
//             `image${i}.jpg`,
//             "image/jpeg"
//           );
//           return { ...image, file, url: blobUrl };
//         }
//         return image;
//       })
//     );

//     while (updatedImages.length < 5) {
//       updatedImages.push({
//         url: "",
//         file: new File([], "placeholder.jpg", { type: "image/jpeg" }),
//       });
//     }
//     setImageList(updatedImages);
//   };
//   loadImages();
// }, [images]);

// // Convert image URL to File and create a blob URL
// const urlToFile = async (
//   url: string,
//   filename: string,
//   mimeType: string
// ): Promise<{ file: File; blobUrl: string }> => {
//   const response = await fetch(url);
//   const buffer = await response.arrayBuffer();
//   const file = new File([buffer], filename, { type: mimeType });
//   const blobUrl = URL.createObjectURL(file);
//   console.log(file, blobUrl);
//   return { file, blobUrl };
// };

//   // Remove image from imageList
//   const removeImage = (index: number) => {
//     const newImageList = imageList.filter((_, i) => i !== index);
//     setImageList(newImageList);
//   };

//   // Add images to imageList (for manual upload)
//   const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       const newImages = Array.from(event.target.files).map((file) => ({
//         url: URL.createObjectURL(file),
//         file,
//       }));
//       setImageList([...imageList, ...newImages]);
//     }
//   };

//   // Submit images
//   const handleContinue = () => {
//     if (imageList.length < 5) {
//       Swal.fire({
//         title: t("oops"),
//         text: t("please_add_at_least_5_images"),
//         timer: 3000,
//         timerProgressBar: true,
//         width: 400,
//         customClass: {
//           confirmButton: "custom-confirm-button",
//         },
//       });
//       return;
//     }

//     setLoading(true);

//     // Create FormData and append images
//     const formData = new FormData();
//     imageList.forEach((image) => {
//       if (image.file) {
//         formData.append("images", image.file);
//       }
//     });

//     // Send form data to the server
//     axios
//       .put(`${urlList}/api/listing/listings/${myBoatId}`, formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//       })
//       .then(() => {
//         Swal.fire({
//           title: t("great"),
//           text: t("prices_updated_successfully"),
//           icon: "success",
//           timer: 2000,
//           showConfirmButton: false,
//           timerProgressBar: true,
//           customClass: {
//             confirmButton: "custom-confirm-button",
//           },
//         });
//         setIsOpen(false); // Close modal after success
//       })
//       .catch(() => {
//         Swal.fire({
//           title: t("oops"),
//           text: t("something_went_wrong_try_again"),
//           icon: "error",
//           timer: 2000,
//           timerProgressBar: true,
//           customClass: {
//             confirmButton: "custom-confirm-button",
//           },
//         });
//       });
//   };


//  console.log(imageList); 
//   return (
//     <ReactModal
//       isOpen={true}
//       onRequestClose={() => setIsOpen(false)}
//       className="flex flex-col items-center justify-center w-full bg-white p-3 rounded-10 shadow-hardShadow md:w-[500px]"
//       overlayClassName="fixed inset-0 backdrop-blur-[7px] bg-opacity-20 bg-black z-20 flex items-center justify-center px-4"
//     >
//       <p className="mb-5 text-[25px] font-bold">{t("update_images")}</p>
//       <div className="grid grid-cols-3 gap-4 w-full max-h-[400px] overflow-auto">
//         {imageList.map((image: any, index: number) => (
//           <div key={index} className="relative">
//             <img
//               // src={image.id ? `${urlList}/${image.url}` : image.url}
//               src={image.url}
//               alt={`Boat image ${index + 1}`}
//               className="w-full h-24 md:h-32 object-cover object-center rounded-lg shadow-sm"
//             />
//             <button
//               onClick={() => removeImage(index)}
//               className="absolute top-2 left-2 text-red-500 text-xl"
//             >
//               <FaMinusCircle />
//             </button>
//           </div>
//         ))}
//         <label className="relative flex items-center justify-center w-full h-24 md:h-32 bg-gray-200 rounded-lg shadow-sm cursor-pointer">
//           <FaCamera className="text-gray-500 text-2xl" />
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             className="absolute inset-0 opacity-0 cursor-pointer"
//             onChange={handleAddImage}
//           />
//         </label>
//       </div>
//       <button
//         onClick={handleContinue}
//         disabled={loading}
//         className="w-full h-10 bg-main text-white rounded-lg shadow-md hover:bg-mainHover transition duration-200 ease-in-out mt-5"
//       >
//         {/* {t("save")} */}
//         {loading ? <LoadingButton /> : t("save")}
//       </button>
//     </ReactModal>
//   );
// };

// export default UpdateImages;
