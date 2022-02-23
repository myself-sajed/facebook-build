import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { db, provider } from "./firebase/firebase";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slices/userSlice";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import Axios from "axios"
import jwt from "jwt-decode"
import { startLoading, stopLoading } from "./redux/slices/loaderSlice";
import Loader from "./components/Body/Modals/Loader";

function App() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const isLoading = useSelector(state => state.loader.isLoading)
  const [load, setLoad] = useState(false)
  // const errorRef = useRef()
  const [error, setError] = useState('')

  // to log the user in
  async function logIn() {

    async function fetcher() {
      // validate the user first

      if (!username || !password) {
        console.log('not user returning')
        setError('All fields are required')
        return
      }
      const q = query(collection(db, "users"), where("username", "==", username));
      onSnapshot(q, (querySnapshot) => {
        const userArr = [];
        if (querySnapshot.empty === false) {
          console.log(querySnapshot.empty);
          querySnapshot.forEach((doc) => {
            console.log('before doc checj')
            console.log('doc exists')
            userArr.push({ userId: doc.id, userData: doc.data() });
            const myUser = userArr[0]

            if (userArr[0].userData.password !== password) {
              console.log('They didnt matched');
              setError('Invalid username or password');
              return false;
            }
            setError('')

            // axios
            Axios.post('http://localhost:4000/generateToken', { username, password })
              .then(res => {
                if (res.data.message === 'success') {
                  console.log('Your JWT Token :', res.data.token)
                  localStorage.clear();
                  localStorage.setItem('token', res.data.token)
                }
                else if (res.data.message === 'error') {
                  console.log('Error :', res.data.error)
                }
              }).catch(function (err) {
                console.log('Something went wrong :', err)
              })
            localStorage.setItem("user", JSON.stringify(myUser))
            dispatch(setUser(myUser))
            setIsLoggedIn(true)
            dispatch(stopLoading())
            console.log('User found')

          }
          )
        }
        else {
          setIsLoggedIn(false)
          dispatch(stopLoading())
          setError('Invalid username or password');

          console.log('User not found')
        }

      });

    }


    fetcher()

  }

  // Loggin user again after Hard refresh
  useEffect(() => {
    setLoad(true)
    const token = localStorage.getItem("token")
    if (token) {

      const { username, password } = jwt(token)
      const q = query(collection(db, "users"), where("username", "==", username));
      onSnapshot(q, (querySnapshot) => {
        console.log('in snapshot');
        const userArr = [];

        if (querySnapshot.empty === false) {
          console.log(querySnapshot.empty);
          querySnapshot.forEach((doc) => {

            userArr.push({ userId: doc.id, userData: doc.data() });
            const myUser = userArr[0]

            if (userArr[0].userData.password !== password) {
              console.log('They didnt matched');
              setError('Invalid username or password');
              return false;
            }
            setError('')

            // axios
            Axios.post('http://localhost:4000/generateToken', { username, password })
              .then(res => {
                if (res.data.message === 'success') {
                  console.log('Your JWT Token :', res.data.token)
                  localStorage.clear()
                  localStorage.setItem('token', res.data.token)
                }
                else if (res.data.message === 'error') {
                  console.log('Error :', res.data.error)
                }
              }).catch(function (err) {
                console.log('Something went wrong :', err)
              })
            localStorage.setItem("user", JSON.stringify(myUser))
            dispatch(setUser(myUser))
            setIsLoggedIn(true)
            setLoad(false)

            dispatch(stopLoading())
            console.log('User found')

          }
          )
        }
        else {
          setIsLoggedIn(null)
          dispatch(stopLoading())
          setError('Invalid username or password');

          console.log('User not found')
        }

      });
    }
  }, [onSnapshot])


  return (
    <>
      {isLoggedIn ?
        <Home /> :

        <Login error={error} logIn={logIn} setPassword={setPassword} setUsername={setUsername} username={username} password={password} />
      }

    </>
  );
}

export default App;
