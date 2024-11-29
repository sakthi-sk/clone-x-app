import {  InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const CustomTextField = styled(TextField)({
  width: "100%",
  borderColor: "#2F3336" ,
  "& .MuiInputLabel-root": { color: "#FFF" }, // Label color
  //"& .MuiInputLabel-root.Mui-focused": { color: "#fff" }, // Focused label color

  "& .MuiOutlinedInput-root": {
    "& input": {
      color: "#fff !important", // Force input text color
    },

    "& fieldset": { borderColor: "#2F3336" }, // Default border color
    // "&:hover fieldset": { borderColor: "#fff" }, // Hover border color
    "&.Mui-focused fieldset": { borderColor: "#1976D2" }, // Focused border color
  },
  "& .MuiFormHelperText-root": { color: "green" }, // Helper text color
});

export const TextFieldMui = ({
  value,
  name,
  onChange,
  icon,
  label,
  type,
  placeholder,
}) => {
  return (
    <CustomTextField
      variant="outlined"
      type={type}
      value={value}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      label={label}
      InputProps={{
        endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
      }}
    />
  );
};



const SearchTextField = styled(TextField)({
  background: "#202327",
  width: "100%",
  borderRadius: 25,

  "& .MuiInputLabel-root": { color: "#FFF" }, // Label color
  "& .MuiInputLabel-root.Mui-focused": { color: "#fff" }, // Focused label color

  "& .MuiOutlinedInput-root": {
    "& input": {
      color: "#fff !important", // Force input text color
    },
    height: "40px",
    "& fieldset": { borderRadius: 25 }, // Default border color
  },
});

export const SearchFieldMui = ({
  value,
  name,
  onChange,
  icon,
  label,
  type,
  placeholder,
}) => {
  return (
    <SearchTextField
      variant="outlined"
      type={type}
      value={value}
      name={name}
      onChange={onChange}
      label={label}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
    />
  );
};


const CommentTextField = styled(TextField)({
  width: "90%",
  "& .MuiInputBase-root": {
    color: "#FFFF ", // Text color
  },

  "& .MuiInput-underline:before": {
    borderBottomColor: "#2F3336", // Default border color
  },
});

export const CommentFieldMui = ({
  value,
  name,
  onChange,
  icon,
  label,
  type,
  placeholder,
}) => {
  return (
    <CommentTextField
      variant="standard"
      multiline
      minRows={1}
      maxRows={4}
      type={type}
      value={value}
      name={name}
      onChange={onChange}
      label={label}
      placeholder={placeholder}
      InputProps={{
        endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
      }}
    />
  );
};