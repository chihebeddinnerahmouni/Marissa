import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { FaPlus, FaMinus, FaUpload } from 'react-icons/fa';

const AddDocuments = () => {
  const [fields, setFields] = useState([{ title: '', photo: null }]);
  const { t } = useTranslation();

  const handleInputChange = (index: any, event: any) => {
    const values = [...fields];
    if (event.target.name === 'title') {
      values[index].title = event.target.value;
    } else if (event.target.name === 'photo') {
      values[index].photo = event.target.files[0];
    }
    setFields(values);
  };

  const handleAddFields = () => {
    const lastField = fields[fields.length - 1];
    if (lastField.title && lastField.photo) {
      setFields([...fields, { title: '', photo: null }]);
    } else {
      alert('Please fill in the previous fields before adding new ones.');
    }
  };

  const handleRemoveField = (index: number) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  // const send = async () => {
  //   if (fields.length === 0) {
  //     alert('Please add at least one document.');
  //     return;
  //   }

  //   const url = import.meta.env.VITE_SERVER_URL_LISTING;
  //   const fieldsToSend = fields.slice(0, -1);
  //   // console.log(fieldsToSend);
  //   for (const field of fieldsToSend) {
  //     const formData = new FormData();
  //     formData.append("document_type", field.title);
  //     formData.append("document", field.photo!);
    
      

  //     axios.post(`${url}/api/submit/documents`, formData, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //       },
  //     })
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }


  const send = async () => {
    if (fields.length === 0) {
      alert("Please add at least one document.");
      return;
    }

    const url = import.meta.env.VITE_SERVER_URL_LISTING;
    // const fieldsToSend = fields.slice(0, -1);
    const formData = new FormData();

    // console.log(fields);

    for (const field of fields) {
      formData.append("document_type", field.title);
      formData.append("document", field.photo!);
    }

    try {
      const response = await axios.post(
        `${url}/api/submit/documents`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-5 bg-emptyInput rounded-lg shadow-md">
      {fields.map((field, index) => (
        <div
          key={index}
          className="w-full grid grid-cols-12 gap-4 items-center bg-white p-4 rounded-lg shadow-sm mb-4 relative"
        >
          <input
            type="text"
            className="outline-none col-span-8 h-10 border border-gray-300 rounded-lg px-3 focus:border-none focus:outline-main"
            name="title"
            placeholder="Title"
            value={field.title}
            onChange={(event) => handleInputChange(index, event)}
          />
          <label
            htmlFor={`photo-${index}`}
            className="cursor-pointer col-span-4 flex items-center justify-center bg-emptyInput border rounded-lg h-10"
          >
            <FaUpload className="text-main mr-2" />
            <p className="text-main font-medium hidden lg:block">Add Photo</p>
          </label>
          <input
            id={`photo-${index}`}
            type="file"
            name="photo"
            onChange={(event) => handleInputChange(index, event)}
            className="hidden"
          />
          {field.photo && (
            <div className="col-span-12 mt-2 flex items-center justify-between">
              <img
                src={URL.createObjectURL(field.photo)}
                alt="Document"
                className="h-20 w-20 object-cover rounded-lg"
              />
              <button
                className="text-red-500"
                onClick={() => handleRemoveField(index)}
              >
                <FaMinus />
              </button>
            </div>
          )}
        </div>
      ))}
      <button
        className="bg-white text-main mt-5 px-4 py-2 border border-dashed border-main rounded-lg hover:text-mainHover hover:border-mainHover flex items-center justify-center"
        onClick={handleAddFields}
      >
        <FaPlus className="mr-2" />
        {t('add')}
      </button>
      <button
        className="bg-main text-white mt-5 px-4 py-2 rounded-lg hover:bg-mainHover flex items-center justify-center"
        onClick={send}
      >
        {t('send')}
      </button>
    </div>
  );
};

export default AddDocuments;

