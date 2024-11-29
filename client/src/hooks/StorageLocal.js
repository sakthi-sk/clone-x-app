 const setItemInLocal=(name,value)=>{
     localStorage.setItem(name, value);
 }

 const getItemInLocal = (name) => {
   return localStorage.getItem(name);
 }
 const removeItemInLocal = (name) => {
  localStorage.removeItem("accessToken");
 };

 //sessionStorage
  const setItemInSession = (name, value) => {
    sessionStorage.setItem(name, value || false);
  };
  const getItemInSession = (name) => {
    const value = JSON.parse(sessionStorage.getItem(name)) || false  ;
    return value;
  };
   const removeItemInSession = (name) => {
     return sessionStorage.removeItem(name);
   };

 


 

 export {
   setItemInLocal,
   getItemInLocal,
   removeItemInLocal,
   setItemInSession,
   getItemInSession,
   removeItemInSession,
 };