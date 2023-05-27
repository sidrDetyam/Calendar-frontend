import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./navigation/AppRouter";
import {useDispatch} from "react-redux";
import {setIsAuthAction} from "./store/UserReducer";
import {useEffect, useState} from "react";
import FullPageLoading from "./components/FullPageLoading";
import {BruhNavBar} from "./components/BruhNavBar";
import {isAuth} from "./api/AuthService";

function App() {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      dispatch(setIsAuthAction(isAuth()))
      setLoading(false)
    }, 100)

  }, [dispatch])

  if (loading) {
    return (<FullPageLoading loadingText={"Loading"}/>)
  }

  return (
      <BrowserRouter>
        <BruhNavBar/>
        <AppRouter/>
      </BrowserRouter>
  );
}

export default App;
