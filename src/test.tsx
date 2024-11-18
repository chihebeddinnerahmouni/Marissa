import { AnyMxRecord } from 'dns';
import { useEffect, useState } from 'react'






const images = [
  {
    url: "https://getmyboat-user-images1.imgix.net/images/541b31cb-082a-4327-8ecd-eafa185e2c7c/-processed.jpg?ixlib=js-3.8.0&q=50&fit=crop&auto=format%2Ccompress&w=445&h=288&dpr=1",
  },
  {
    url: "https://getmyboat-user-images1.imgix.net/images/6000addfccf0e/boat-rentals-cala-dor-illes-balears-invictus-fx-200-processed.jpg?ixlib=js-3.8.0&q=50&fit=crop&auto=format%2Ccompress&w=445&h=288&dpr=1",
  },
];

const test = () => {

  const [imagesTwo, setImagesTwo] = useState<any>([]);
  useEffect(() => {
    const formData = new FormData();

    const fetchImages = async () => {
      const fetchedImages = await Promise.all(
        images.map(async (image: any) => {
          const response = await fetch(image.url); // Fetch the image from the URL
          const blob = await response.blob(); // Convert response to a Blob
          const fileName = image.url.split("/").pop(); // Extract file name from URL
          const file = new File([blob], fileName!, { type: blob.type }); // Create a File object
          return file;
        })
      );

      setImagesTwo(fetchedImages);
    };

    fetchImages();
  }, [images]);

  console.log(imagesTwo);



  return (
    <div>
      {images.map((image, index) => (
        <img key={index} src={image.url} alt="img" />
      ))}
      
    </div>
  )
}

export default test
