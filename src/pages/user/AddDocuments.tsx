import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { FaPlus, FaMinus, FaUpload, FaFilePdf } from 'react-icons/fa';
import LoadingButton from '../../components/ui/LoadingButton';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import {useParams} from 'react-router-dom';

const AddDocuments = () => {
  const [fields, setFields] = useState([{ title: "", photo: null }]);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const navigate = useNavigate();
  const { submissionId } = useParams();

        // console.log(submissionId);


  const handleInputChange = (index: any, event: any) => {
    const values = [...fields];
    if (event.target.name === "title") {
      values[index].title = event.target.value;
    } else if (event.target.name === "photo") {
      values[index].photo = event.target.files[0];
    }
    setFields(values);
  };

  const handleAddFields = () => {
    const lastField = fields[fields.length - 1];
    if (lastField.title && lastField.photo) {
      setFields([...fields, { title: "", photo: null }]);
    } else {
      alert("Please fill in the previous fields before adding new ones.");
    }
  };

  const handleRemoveField = (index: number) => {
    if (fields.length === 1) {
      alert("You can't remove the last field.");
      return;
    }
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };
  // console.log(fields[0].photo);

  
  const send = async () => {
    if (fields.length === 0) {
      alert("Please add at least one document.");
      return;
    }

    for (const field of fields) {
      if (!field.title || !field.photo) {
        alert("Please fill in all fields.");
        return;
      }
    }

    setLoading(true);
    for (const field of fields) { 
      const formData = new FormData();
      formData.append("document_type", field.title);
      formData.append("document", field.photo!);
      formData.append("submission_id", submissionId!);
      try {
        await axios.post(
          `${url}/api/submit/documents`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Documents uploaded successfully!',
        }).then(() => {
          navigate('/?page=1');
        });
      }
      catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });

        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full min-h-screen py-10 mt-[75px] flex flex-col items-center justify-center px-4 md:px-[80px] lg:mt-[95px] bg-creme">
      <div className="content w-full max-w-[700px]">
        {fields.map((field, index) => (
          <div
            key={index}
            className="w-full max-w-3xl bg-white p-5 pt-10 rounded-lg border mb-4 relative shadow-sm"
          >
            <button
              className="text-red-500 mt-2 absolute right-2 top-1"
              onClick={() => handleRemoveField(index)}
            >
              <FaMinus />
            </button>
            <input
              type="text"
              className="outline-none col-span-8 h-10 mb-5 w-full border border-gray-300 rounded-lg px-3 focus:border-none focus:outline-main"
              name="title"
              placeholder="Title"
              value={field.title}
              onChange={(event) => handleInputChange(index, event)}
            />

            <label
              htmlFor={`photo-${index}`}
              className="cursor-pointer w-full h-40 flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded-lg lg:h-80"
            >
              {field.photo ? (
                (field.photo as File).type === "application/pdf" ? (
                  <FaFilePdf className="text-gray-500 text-3xl" />
                ) : (
                  <img
                    src={URL.createObjectURL(field.photo)}
                    alt="Document"
                    className="h-full w-full object-cover rounded-lg "
                  />
                )
              ) : (
                <FaUpload className="text-gray-500 text-3xl" />
              )}
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
          className="text-main w-full mt-5 px-4 min-h-10 rounded-lg flex items-center justify-center border-2 border-dotted border-main  hover:text-mainHover"
          onClick={handleAddFields}
        >
          <FaPlus className="mr-2" />
          {t("add")}
        </button>
        <button
          disabled={loading}
          className="bg-main text-white w-full min-h-10 mt-5 px-4 py-2 rounded-lg hover:bg-mainHover flex items-center justify-center"
          onClick={send}
        >
          {loading ? <LoadingButton /> : t("send")}
        </button>
      </div>
    </div>
  );
};

export default AddDocuments;