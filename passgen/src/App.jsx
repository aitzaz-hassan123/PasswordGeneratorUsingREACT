import { useState, useCallback, useEffect,useRef} from "react"
function App() {
  let [length,setlength]=useState(8)
  let [numberAllowed,setNumberAllow]=useState(true)
  let [charAllowed,setCharAllowd]=useState(true)
  let [password,setPass]=useState('')
  let passwordRef=useRef(null)
 let paswordGen=useCallback(()=>{
  console.log('hi')
  let pass=''
  let string='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  if(numberAllowed)
  {
    string=string +'0123456789';
  }
  if(charAllowed)
  {
  string=string + '~`!@#$%^&*()'
  }
  for(let i=0;i<length;i++)
  {
    let ranindex=Math.floor(Math.random()*string.length)
    let randomNumber=string.charAt(ranindex)
    pass=pass+randomNumber
  
  }
  setPass(pass)
 
 },[numberAllowed,length,charAllowed]);
  
let copyFunction=useCallback(()=>{
passwordRef.current?.select()
passwordRef.current?.setSelectionRange(0,length)
window.navigator.clipboard.writeText(password)
},[password])
 useEffect(()=>{
  paswordGen()
   console.log(password)
 },[length,charAllowed,numberAllowed])
  return(
    <>
    <div>

      <div>
         <input type="text" value={password} readOnly ref={passwordRef}/>
         <button onClick={copyFunction}>COPY</button>
      </div>
      <div>
      <input type="range" min={6} max={10} value={length} onChange={(e)=>{
        setlength(e.target.value)
      }} />
      <label> Length: {length} </label>
      </div>
      <input type='checkbox' value={numberAllowed} onClick={()=>{
        setNumberAllow((prev)=>{
          return !prev})
      }
      } />
      <label>Numbers</label>

      <input type='checkbox' value={charAllowed} onChange={()=>{
        setCharAllowd(prev=>!prev)
      }} />
      <label>Character</label>
    </div>
   
    </>
  )
}

export default App
