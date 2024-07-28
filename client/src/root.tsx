import { useEffect, useState } from "react"
import App from "./App";
import LogIn from "./pages/LogIn";

export default function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('loggedIn')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [])

  function handleLogIn() {
    setIsLoggedIn(true);
  }

  if (!isLoggedIn) return <LogIn handleLogIn={handleLogIn} />
  return (
    <App />
  )
}