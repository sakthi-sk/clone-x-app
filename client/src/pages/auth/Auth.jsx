import './Auth.css'
import { Box, Stack } from "@mui/material";
import { TextFieldMui } from  "../../components/muiComponents/inputMui"
import { EmailIcon, PersonIcon, RemoveRedEyeIcon, VisibilityOffIcon } from "../../muiIcons";
import { useState } from "react";
import { ButtonMui } from '../../components/muiComponents/buttonMui';
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { postLogin, postSingUp } from '../../Services/auth';
import ButtonLoader from '../../components/loder/ButtonLoader';



const Auth = () => {
  const [authLogin,setAuthLogin]=useState(true)
 
  return (
    <Box
      className="auth_container"
      sx={{
        display: "flex",

        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#191919",
          flex: { xs: 0.9, sm: 0.5, md: 0.3 },
          p: 2,
          borderRadius: "10px",
        }}
      >
       
          <Stack spacing={2}>
            <div className="auth_logo">logo</div>

            <div className="auth_title">
              <h2>Welcome app name</h2>
            </div>
            {authLogin ? <LoginTap /> : <NewUserLoginTap />}

            <div className="other_info">
              <p onClick={() => setAuthLogin(!authLogin)}>
              { authLogin? "create new account ?" :"Already have an account?"}
              </p>
            </div>
          </Stack>
       
      </Box>
    </Box>
  );
}





const LoginTap=()=>{
   const [passwordView, setPasswordView] = useState(true);
    const initialState = {
      username: "",
      password: "",
    };

    const [userLoginInfo, setUserLoginInfo] = useState(initialState);

    
 const handelOnChang = (e) => {
   const { name, value } = e.target;
   setUserLoginInfo((prev) => ({ ...prev, [name]: value }));
 };

    const resetForm = () => {
      setUserLoginInfo(initialState); // Reset to the initial state
    };


   const queryClient = useQueryClient();
   const { mutate, isPending, isError, error } = useMutation({
     mutationFn: postLogin,
     onSuccess: () => {
       
       resetForm();
        queryClient.invalidateQueries({
          queryKey: ["authUser"],
        });
      
     },
   });

   const [errorMsg,serErrorMsg]=useState({})
   


    const handelSubmit = (e) => {
      e.preventDefault();

     
      if (!userLoginInfo.username){
        return serErrorMsg({ username :true});
      } 

      
      if (!userLoginInfo.password) {
        return serErrorMsg({ password: true });
      } 

      serErrorMsg({})
       
      mutate(userLoginInfo);
    };


   return (
     <form onSubmit={handelSubmit}>
       <Stack spacing={3} className="auth_input">
         <TextFieldMui
           name={"username"}
           value={userLoginInfo.username}
           label={"UserName"}
           type={"text"}
           icon={<PersonIcon />}
           onChange={handelOnChang}
         />
         <TextFieldMui
           name={"password"}
           value={userLoginInfo.password}
           label={"Password"}
           type={passwordView ? "password" : "text"}
           onChange={handelOnChang}
           icon={
             passwordView ? (
               <VisibilityOffIcon
                 onClick={() => setPasswordView(!passwordView)}
               />
             ) : (
               <RemoveRedEyeIcon
                 onClick={() => setPasswordView(!passwordView)}
               />
             )
           }
         />

         {errorMsg.username && (
           <p style={{ color: "red", textAlign: "center", fontSize: "12px" }}>
             Username is required.
           </p>
         )}

         {errorMsg.password && (
           <p style={{ color: "red", textAlign: "center", fontSize: "12px" }}>
             password is required.
           </p>
         )}

         {isError && (
           <p style={{ color: "red", textAlign: "center", fontSize: "12px" }}>
             {error}
           </p>
         )}
         <ButtonMui value={isPending} onClick={handelSubmit}>
           {isPending ? <ButtonLoader /> : "Login"}
         </ButtonMui>
       </Stack>
     </form>
   );
}

const NewUserLoginTap = () => {

  const initialState = {
    username: "",
    name: "",
    email: "",
    password: "",
  };

 const [passwordView, setPasswordView] = useState(true);

 const [loginUserInfo, setLoginUserInfo] = useState(initialState);

 const resetForm = () => {
   setLoginUserInfo(initialState); // Reset to the initial state
 };

 const handelOnChang=(e)=>{
     const{name,value}=e.target
     setLoginUserInfo((prev)=>({...prev,[name]:value}))
 }


 const queryClient=useQueryClient()
 const { mutate, isPending, isError, error, } = useMutation({
   mutationFn: postSingUp,
   onSuccess: () => {
    resetForm()
    queryClient.invalidateQueries({
      queryKey: ["authUser"],
    });
    
   },
 });

 const [errorMsg,setErrorMsg]=useState({})

 const handelSubmit=(e)=>{
   e.preventDefault()

   if (!loginUserInfo.name) return setErrorMsg({name:true})
    if (!loginUserInfo.username) return setErrorMsg({ username: true });
   if (!loginUserInfo.email) return setErrorMsg({ email: true });
   if (!loginUserInfo.password) return setErrorMsg({ password: true });
   setErrorMsg({})
   
    mutate(loginUserInfo);
     

 }



  return (
    <form onSubmit={handelSubmit}>
      <Stack spacing={1} className="auth_input">
        <TextFieldMui
          value={loginUserInfo.username}
          name={"username"}
          label={"UserName"}
          type={"text"}
          icon={<PersonIcon />}
          onChange={handelOnChang}
        />
        <TextFieldMui
          value={loginUserInfo.name}
          name={"name"}
          label={"Name"}
          type={"text"}
          icon={<PersonIcon />}
          onChange={handelOnChang}
        />
        <TextFieldMui
          value={loginUserInfo.email}
          name={"email"}
          label={"Email"}
          type={"email"}
          icon={<EmailIcon />}
          onChange={handelOnChang}
        />

        <TextFieldMui
          value={loginUserInfo.password}
          name={"password"}
          label={"Password"}
          type={passwordView ? "password" : "text"}
          icon={
            passwordView ? (
              <VisibilityOffIcon onClick={() => setPasswordView((pr) => !pr)} />
            ) : (
              <RemoveRedEyeIcon onClick={() => setPasswordView((pr) => !pr)} />
            )
          }
          onChange={handelOnChang}
        />
        {errorMsg.name && (
          <p style={{ color: "red", textAlign: "center", fontSize: "12px" }}>
            Name is required.
          </p>
        )}
        {errorMsg.username && (
          <p style={{ color: "red", textAlign: "center", fontSize: "12px" }}>
            Username is required.
          </p>
        )}
        {errorMsg.email && (
          <p style={{ color: "red", textAlign: "center", fontSize: "12px" }}>
            Email is required.
          </p>
        )}
        {errorMsg.password && (
          <p style={{ color: "red", textAlign: "center", fontSize: "12px" }}>
            Password is required.
          </p>
        )}

        {isError && (
          <p style={{ color: "red", textAlign: "center", fontSize: "12px" }}>
            {error}
          </p>
        )}
        <ButtonMui value={isPending} onClick={handelSubmit}>
          {isPending ? <ButtonLoader /> : " sign Up"}
        </ButtonMui>
      </Stack>
    </form>
  );
};

export default Auth
