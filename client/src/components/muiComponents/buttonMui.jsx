
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";


const CustomButtonMui = styled(Button)({
  textTransform: "capitalize",
  fontSize:15,
  
});

export const ButtonMui = ({ children, onClick, style ,value }) => {
  return (
    <CustomButtonMui
      variant="contained"
      disableRipple
      disabled={value}
      onClick={onClick}
      sx={style}
      type="submit"
    >
      {children}
    </CustomButtonMui>
  );
};

const CustomFollowButtonMui = styled(Button)({
  textTransform: "capitalize",
  fontSize: 11,
  background: "#EFF3F4",
  color: "#0F1419",
  borderRadius:"20px",
  height:"30px",
  fontWeight:"bold",
  width:"90px"
});

export const FollowButtonMui = ({ children, onClick,value }) => {
  return (
    <CustomFollowButtonMui
      variant="contained"
      disableRipple
      disabled={false}
      onClick={onClick}
      sx={{
        background:value&& "#1976D2",
        color: value &&"#FFF"
      }}
    >
      {children}
    </CustomFollowButtonMui>
  );
};

const EditFollowButtonMui = styled(Button)({
  textTransform: "capitalize",
  fontSize: 16,
  background: "#000000",
  color: "#fff",
  borderRadius: "20px",
  height: "30px",
  fontWeight: "bold",
  border: "1px solid #536471",
  "&.Mui-disabled": {
    background: "#000000", // Keep the background black
    color: "#808080", // Set the text color for disabled state
    border: "1px solid #808080", // Adjust border color for disabled state
  },
});

export const EditButtonMui = ({ children, onClick, disabled }) => {
  return (
    <EditFollowButtonMui
      variant="contained"
      disableRipple
      disabled={disabled||false}
      onClick={onClick}
    >
      {children}
    </EditFollowButtonMui>
  );
};