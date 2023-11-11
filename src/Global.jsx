import { useContext, createContext, useState } from "react";
export const appContext = createContext();
export const globalContext = () => useContext(appContext);

const AppProvider = ({ children }) => {
  const [fav, setFav] = useState([]);
  const addtoFav = (album) => {
    if (!fav.some((falbum) => falbum.id === album.id)) {
      const newFav = [...fav, album];
      setFav(newFav);
    }
  };
  return (
    <appContext.Provider value={(fav, addtoFav, setFav)}>
      {children}
    </appContext.Provider>
  );
};
export default AppProvider;
