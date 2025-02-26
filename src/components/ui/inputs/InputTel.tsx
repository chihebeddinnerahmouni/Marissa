// import TextField from "@mui/material/TextField";
// import InputAdornment from "@mui/material/InputAdornment";

// interface InputTextProps {
//   value: string;
//   setValue: (value: string) => void;
//   label: string;
//   error?: boolean;
//   helperText?: string | false | undefined;
// }

// const InputTel = ({
//   value,
//   setValue,
//   label,
//   error,
//   helperText,
// }: InputTextProps) => {
//   const mainColor = "#199B8A";

//   return (
//     <TextField
//       label={label}
//       value={value}
//       onChange={(e: any) => setValue(e.target.value)}
//       variant="standard"
//       type="tel"
//       fullWidth
//       error={error}
//       helperText={helperText}
//       slotProps={{
//         input: {
//           startAdornment: (
//             <InputAdornment position="start">+213</InputAdornment>
//           ),
//         },
//       }}
//       sx={{
//         "& input": {
//           color: "black",
//         },
//         "& label.Mui-focused": {
//           color: mainColor,
//         },
//         "& label": {
//           color: "gray",
//         },
//         "& .MuiInput-underline:before": {
//           borderBottomColor: "gray",
//         },
//         "& .MuiInput-underline:hover:before": {
//           borderBottomColor: mainColor,
//         },
//         "& .MuiInput-underline:after": {
//           borderBottomColor: mainColor,
//         },
//       }}
//     />
//   );
// };

// export default InputTel;
import React from 'react';

interface InputTelProps {
  value: string;
  setValue: (value: string) => void;
  label: string;
  error?: boolean;
  helperText?: string | false | undefined;
}

const InputTel: React.FC<InputTelProps> = ({ value, setValue, label, error, helperText }) => {
  return (
    <div className="w-full bg-white rounded-lg">
      <div
        className={`flex items-center rounded-lg border transition h-[49px] ${
          error
            ? "border-red-400 border-[2px]"
            : "border-gray-300 focus-within:border-[3px] focus-within:border-teal-400"
        }`}
      >
        <span className="mx-2">+213</span>
        <input
          type="text"
          className={`w-full border-none rounded-r-lg focus:outline-none focus:ring-0`}
          placeholder={label}
          // required
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
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

export default InputTel;