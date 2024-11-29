import "./App.css"
import { Route, Routes } from "react-router-dom";
import route from './router/index'
import {  useQuery } from "@tanstack/react-query";
import { getAuthUser } from "./Services/auth";
import PrivateRoutes from "./router/PrivateRoute";
import PublicRoutes from "./router/PublicRoutes";
import { getItemInSession } from "./hooks/StorageLocal";
import LinearIndeterminate from "./components/loder/LinearIndeterminate";
import ButtonLoader from "./components/loder/ButtonLoader";




function App() {
const routes = route();
const authLoading = getItemInSession("isAuth") === null ? false : getItemInSession("isAuth");



const { data, isLoading } = useQuery({
  queryKey: ["authUser"],
  queryFn: getAuthUser,
  retry:false
  
});


 if (isLoading){
  return (
    <div className="App">
      <LinearIndeterminate />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap:"20px"
        }}
      >
        <p style={{ color: "gray" }}>Loading</p> 
        <div>
          <ButtonLoader />
        </div>
      </div>
    </div>
  );
 }
   return (
     <div className="App">
       <Routes>
         <Route element={<PublicRoutes isLoggedIn={authLoading} />}>
           {routes.publicRoutes?.map(({ path, element }, i) => (
             <Route key={i} path={path} element={element} />
           ))}
         </Route>

         <Route element={<PrivateRoutes isLoggedIn={authLoading} />}>
           {routes.privateRoutes?.map(({ path, element, children }, i) => (
             <Route key={i} path={path} element={element}>
               {children?.map(
                 ({ path, element: component, children: child }, i) => (
                   <Route key={i} path={path} element={component}>
                     {child?.map(({ path, element: ChildComponent }, i) => (
                       <Route key={i} path={path} element={ChildComponent} />
                     ))}
                   </Route>
                 )
               )}
             </Route>
           ))}
         </Route>
         <Route
           path="*"
           element={
             <div
               style={{
                 display: "flex",
                 alignItems: "center",
                 justifyContent: "center",
                 height: "100%",
                 gap: "20px",
               }}
             >
               <p style={{ color: "gray" }}>page Not Found</p>
               
             </div>
           }
         />
       </Routes>
     </div>
   );
}

export default App;
