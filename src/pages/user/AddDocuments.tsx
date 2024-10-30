import { send } from 'process';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const AddDocuments = () => {
    const [fields, setFields] = useState([{ title: '', photo: null }]);
    const { t } = useTranslation();



  
  // for adding documents
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
  

  // for sending documents
  const send = async () => { 
    if (fields.length === 1) {
      alert('Please add at least one document.');
      return;
    }

    const url = import.meta.env.VITE_SERVER_URL_LISTING;
    const fieldsToSend = fields.slice(0, -1); 
    console.log(fieldsToSend);
    for (const field of fieldsToSend) {
      const formData = new FormData();
      formData.append("document_type", field.title);
      formData.append("document", field.photo!);


      axios.post(`${url}/api/submit/documents`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });      
    }   
  }

    return (
      <div className="w-full grid grid-cols-1 gap-5 lg:max-w-[1000px]">
        {fields.map((field, index) => (
          <div
            key={index}
            className="w-full grid grid-cols-12 gap-2 items-center"
          >
            <input
              type="text"
              className="outline-none col-span-8 h-10 border border-gray-300 rounded-[5px] px-2 focus:border-none focus:outline-main"
              name="title"
              placeholder="Title"
              value={field.title}
              onChange={(event) => handleInputChange(index, event)}
            />
            <label
              htmlFor={`photo-${index}`}
              className="cursor-pointer col-span-4"
            >
              <p className="text-main font-medium">Add Photo</p>
            </label>
            <input
              id={`photo-${index}`}
              type="file"
              name="photo"
              onChange={(event) => handleInputChange(index, event)}
              className="hidden"
            />
          </div>
        ))}
        <button
          className="bg-white text-main mt-5 px-4 py-2 custom-dotted-border rounded-[5px] hover:text-mainHover hover:border-mainHover lg:max-w-[500px]"
          onClick={handleAddFields}
        >
                {t('add')}
        </button>
        <button
          className="bg-main text-white mt- px-4 py-2 hover:text-mainHover hover:border-mainHover lg:max-w-[500px]"
          onClick={send}
        >
                {t('send')}
        </button>
      </div>
    );
};

export default AddDocuments;


