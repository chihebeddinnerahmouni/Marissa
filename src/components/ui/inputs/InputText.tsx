interface InputTextProps {
  value: string;
  setValue: any;
  label: string;
  error?: boolean;
  helperText?: string | false | undefined;
  bgColor?: string;
}

const InputText = ({ value, setValue, label, error, helperText, bgColor="" }: InputTextProps) => {

  return (
    <div className="w-full">
      <input
        type="text"
        className={`w-full border rounded-lg p-3 focus:ring-2 transition outline-none ${bgColor} ${
          error
            ? "border-red-500 focus:ring-red-400 focus:border-red-400"
            : "border-gray-300 focus:ring-red-300 focus:border-red-300"
        }`}
        placeholder={label}
        value={value || ""}
        onChange={setValue}
      />
      {helperText && (
        <span
          className={`text-sm mt-1 ${error ? "text-red-500" : "text-gray-500"}`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default InputText;