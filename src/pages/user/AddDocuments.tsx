import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { FaPlus, FaMinus, FaUpload, FaFilePdf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { axios_error_handler } from "@/functions/axios_error_handler";
import ButtonFunc from "@/components/ui/buttons/Button";
import InputText from "@/components/ui/inputs/InputText";
import { toast } from "react-hot-toast";


const AddDocuments = () => {
  const [fields, setFields] = useState([{ title: "", photo: null }]);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const navigate = useNavigate();
  const { submissionId } = useParams();

  // console.log(submissionId);

  const handleImageAdd = (index: any, event: any) => {
    const values = [...fields];
    values[index].photo = event.target.files[0];
    setFields(values);
  };

  const handleAddFields = () => {
    const lastField = fields[fields.length - 1];
    if (lastField.title && lastField.photo) {
      setFields([...fields, { title: "", photo: null }]);
    } else {
      toast.error(t("please_fill_in_the_previous_fields_before_adding_new_ones"), {style: {border: "1px solid #FF385C", color: "#FF385C"}});
    }
  };

  const handleRemoveField = (index: number) => {
    if (fields.length === 1) {
      toast.error(t("you_cant_remove_the_last_field"), {style: {border: "1px solid #FF385C", color: "#FF385C"}});
      return;
    }
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  const send = async () => {
    if (fields.length === 1) {
      toast.error(t("please_add_at_least_one_document"), {style: {border: "1px solid #FF385C", color: "#FF385C"}});
      return;
    }

    for (const field of fields) {
      if (!field.title || !field.photo) {
        toast.error(t("please_fill_in_all_fields"), {style: {border: "1px solid #FF385C", color: "#FF385C"}});
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
        await axios.post(`${url}/api/submit/documents`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        navigate("/?page=1");
      } catch (error) {
        axios_error_handler(error, t);
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full min-h-screen py-10 mt-[75px] flex flex-col items-center justify-center px-4 md:px-[80px] lg:mt-[95px] bgcreme">
      <div className="content w-full max-w-[700px]">
        {fields.map((field, index) => (
          <div
            key={index}
            className="w-full max-w-3xl bg-white p-5 pt-10 rounded-lg border mb-4 relative shadow-hardShadow"
          >
            <button
              className="text-red-500 mt-2 absolute right-2 top-1"
              onClick={() => handleRemoveField(index)}
            >
              <FaMinus />
            </button>
            <InputText
              value={field.title}
              setValue={(event: any) => {
                const values = [...fields];
                values[index].title = event.target.value;
                setFields(values);
              }}
              label={t("title")}
            />

            <label
              htmlFor={`photo-${index}`}
              className="cursor-pointer mt-5 w-full h-40 flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded-lg lg:h-80"
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
              onChange={(event) => handleImageAdd(index, event)}
              className="hidden"
            />
          </div>
        ))}
        <div className="mt-5 w-full space-y-4">
          <ButtonFunc
            onClick={handleAddFields}
            text={t("add")}
            color="#A9A9A9"
            Icon={<FaPlus />}
          />
          <ButtonFunc onClick={send} text={t("send")} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default AddDocuments;

{
  /* <button
          className="text-main w-full mt-5 px-4 min-h-10 rounded-lg flex items-center justify-center border-2 border-dotted border-main  hover:text-mainHover"
          onClick={handleAddFields}
        >
          <FaPlus className="mr-2" />
          {t("add")}
        </button> */
}
