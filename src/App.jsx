import { Fragment } from "react";
import { useEffect, useState, useCallback, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App() {

  const passwordRef = useRef(null) ;
  const [ password, setPassword ] = useState() ;
  const [ length, setLength ] = useState(8) ;
  const [ numberAllowed , setNumberAllowed ] = useState(false) ;
  const [ characterAllowed, setCharacterAllowed ] = useState(false) ;

  const copyToClipBoard =useCallback( () => {
    passwordRef.current?.select();
    // passwordRef.current.setSelectionRange(password.length) ;
    window.navigator.clipboard.writeText(password) ;
    toast('Password Copied', {
      position: "top-right",
      autoClose: 200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }, [password] )

  const generatePassword =   useCallback( () => {

    
    let passwordAlaphaaHelper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' ;
    const passwordNumberHelper = '0987654321' ;
    const passwordCharacterHelper = "@#$%><" ;

    let xxxPassword = '' ;

    if(numberAllowed){
      passwordAlaphaaHelper += passwordNumberHelper ;
    }

    if(characterAllowed) {
      passwordAlaphaaHelper += passwordCharacterHelper ;
    }

    // for(let jj = 0 ; )
    console.log(passwordAlaphaaHelper) ;
    console.log(passwordAlaphaaHelper.length) ;
    console.log(length) ;


    for(let kk = 0 ; kk < length; kk++ ) {
      let xCharacter = Math.floor(Math.random() * passwordAlaphaaHelper.length) ;
      // console.log(passwordAlaphaaHelper[xCharacter]) ;
      xxxPassword += passwordAlaphaaHelper[xCharacter] ;
    }

    console.log(xxxPassword) ;
    setPassword(xxxPassword) ;


  } , [length, numberAllowed, characterAllowed , setPassword]) ;

    
  useEffect( () => {
    generatePassword() ;

  }, [length, numberAllowed, characterAllowed]) ;

  return (
    <Fragment>
      <div className=" w-screen h-screen bg-gray-800 flex justify-center items-center">
        <div className="container flex flex-wrap flex-col w-fit px-3 py-2 rounded-xl outline-none bg-gray-950 gap-5">
            <div className="flex items-center justify-center mt-2">
              <ToastContainer/>
              <input
                 type="text" 
                 placeholder="password"
                 value={password}
                 onChange={(e) => {setPassword(e.target.value)}}
                 className="px-3 py-2 text-left rounded-tl-lg rounded-bl-lg outline-none w-2/3"
                 readOnly

                 ref={passwordRef}
              />
              <button onClick={copyToClipBoard} className=" outline-none px-3 py-2 text-center rounded-tl-none rounded-bl-none rounded-tr-lg rounded-br-lg outline-none">copy</button>
            </div>
            <div className="flex gap-3 items-center">
              <div className="flex items-center">
                <input 
                  className="mr-1"
                  type="range"
                  value={length}
                  onChange={(e) => {setLength(Number(e.target.value))}}
                  min={5}
                  max={20}
                  id="rangePassword" 
                />
                <label htmlFor="rangePassword">Length: {length}</label>
              </div>

              <div>
                <input 
                  type="checkbox" 
                  value={numberAllowed}
                  onChange={(e) => {setNumberAllowed(!numberAllowed)}}
                  id="numberPassword"
                  className="mr-1"
                />

                <label htmlFor="numberPassword">Number</label>
              </div>

              <div>
                <input 
                  type="checkbox" 
                  value={characterAllowed}
                  onChange={(e) => {setCharacterAllowed(!characterAllowed)}}
                  id="characterPassword"
                  className="mr-1"
                />

                <label htmlFor="characterPassword">Character</label>
              </div>
            </div>
        </div>
      </div>
    </Fragment>
  ) ;
}