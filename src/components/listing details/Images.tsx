import { useContext, useEffect } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import { useTranslation } from "react-i18next";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import Swal from "sweetalert2";



const Images = () => {
    const { setProgress, steps, selectedImages, setSelectedImages, name, desc, lat, long, selectedFeatures } = useContext(ListingDetailsContext);
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        setProgress((100 / steps) * 5);
        const check = !name || !desc || !lat || !long || selectedFeatures.length === 0;
        if (check) {
            navigate("/boats-list/title");
        }
    }, []);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            const imagesArray = filesArray.map((file) => ({
                file,
                url: URL.createObjectURL(file),
            }));
            setSelectedImages((prevImages: any) => [...prevImages, ...imagesArray]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setSelectedImages((prevImages: any) => prevImages.filter((_: any, i: any) => i !== index));
    };

    const handleContinue = () => {
        if (selectedImages.length < 5) {
            Swal.fire({
              title: "Oops...",
              text: "Please upload at least 5 images!",
              customClass: {
                confirmButton: "custom-confirm-button",
              },
            });
            return;
        }

        // console.log(selectedImages);
        // console.log('type of selectedImages', typeof selectedImages);   
        // sessionStorage.setItem(
        //   "Listing_details_images",
        //   JSON.stringify(selectedImages)
        // );
        navigate("/boats-list/category");
    };

    return (
        <div className="w-full md:w-[500px] lg:w-[600px] xl:w-[700px]">
            <p className="mb-5 text-[25px] font-bold">{t("upload_photos")}</p>

            <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="file-input"
                accept="image/*"
            />
            <label htmlFor="file-input" className="mb-5 flex items-center gap-2 text-main cursor-pointer">
                <FaCloudUploadAlt className="" />
                {t("upload_photo")}
            </label>

            <div className="mb-5 grid grid-cols-1 gap-5 w-full lg:grid-cols-2">
                {selectedImages.map((image: any, index: any) => (
                    <div key={index} className="relative w-full shadow-hardShadow">
                        <img
                            src={image.url}
                            alt={`Selected ${index}`}
                            className="w-full h-[200px] object-cover object-center"
                        />
                        <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-[-15px] right-1 bg-main shadow-hoverShadow text-white rounded-full w-[30px] h-[30px]"
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            <ContinueButton onClick={handleContinue} />
        </div>
    );
};

export default Images;





// import { useContext, useEffect, useState } from "react";
// import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
// import { useTranslation } from "react-i18next";
// import ContinueButton from "../Listing/ContinueButton";
// import { useNavigate } from "react-router-dom";
// import { FaCloudUploadAlt } from "react-icons/fa";


// interface ImageFile {
//     file: File;
//     url: string;
// }

// const Images = () => {
//     const { setProgress, steps } = useContext(ListingDetailsContext);
//     const { t } = useTranslation();
//     const navigate = useNavigate();
//     const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);

//     useEffect(() => {
//         setProgress((100 / steps) * 5);
//     }, []);

//     const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files) {
//             const filesArray = Array.from(event.target.files);
//             const imagesArray = filesArray.map((file) => ({
//                 file,
//                 url: URL.createObjectURL(file),
//             }));
//             setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);
//         }
//     };

//     const handleRemoveImage = (index: number) => {
//         setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
//     };

//     const handleContinue = () => {
//         // Handle continue logic
//     };

//     return (
//         <div className="w-full md:w-[500px]">
//             <p className="mb-5 text-[25px] font-bold">{t("upload_photos")}</p>

//             <input
//                 type="file"
//                 multiple
//                 onChange={handleImageChange}
//                 className="mb-5"
//                 accept="image/*"
//             />

//             <div className="mb-5 grid grid-cols-2 gap-2">
//                 {selectedImages.map((image, index) => (
//                     <div key={index} className="relative">
//                         <img
//                             src={image.url}
//                             alt={`Selected ${index}`}
//                             className="w-full h-auto"
//                         />
//                         <button
//                             onClick={() => handleRemoveImage(index)}
//                             className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                         >
//                             X
//                         </button>
//                     </div>
//                 ))}
//             </div>

//             <ContinueButton onClick={handleContinue} />
//         </div>
//     );
// };

// export default Images;