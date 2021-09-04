import { useState } from "react";

const SimpleInput = (props) => {
  let [visible,setVisible]=useState(true)
  let [minSixteen,setMinSixteen]=useState(false)
  let [noZero,setNoZero]=useState(true)
  let [noBlank,setNoBlank]=useState(true)
  let [containsLower,setContainsLower]=useState(false)
  let [containsUpper,setContainsUpper]=useState(false)
  let [counter,setCounter]=useState(0)

  let visibleHandler=()=>{
    setVisible(!visible)
  }

  let onSubmitHandler=(event)=>{
    event.preventDefault()
  }
  let onChangeHandler=(event)=>{
    
  /*   setTimeout(()=>{ */
     
        if(event.target.value.length>15){
          setMinSixteen(true)
        }
        if(event.target.value.trim()==''){
          setMinSixteen(false)
          setNoZero(true)
          setNoBlank(true)
          setContainsLower(false)
          setContainsUpper(false)
          setCounter(0)
          setContainsUpper(0)
          setContainsLower(0)
        }
        if(event.target.value.includes('0')){
          setNoZero(false)
        }
        if(event.target.value.includes(' ')){
          setNoBlank(false)
        }
        if(event.target.value.trim()!='' && isNaN(event.target.value) && event.target.value == event.target.value.toUpperCase()){
          setContainsUpper((prev)=>prev+=1)
        }if(event.target.value.trim()!='' && isNaN(event.target.value) && event.target.value != event.target.value.toUpperCase()){
          setContainsLower((prev)=>prev+=1)
        }
  
        
  /*   },700) */
    
  }
  
  let onKeyPressHandler=(event)=>{
    if(!isNaN(event.key)){
      setCounter((prev)=>prev+=1)
    }
    if(isNaN(event.key) && event.key == event.key.toUpperCase()){
      setContainsUpper(true)
    }else if(isNaN(event.key) && event.key != event.key.toUpperCase()){
      setContainsLower(true)
    }

  }

  let buttonClass=(minSixteen&&noZero&&noBlank&&containsLower>0&&containsUpper>0&&counter>4)?'abled':'disabled'

  let classValidSixteen=minSixteen?'valid':'invalid'
  let classValidnoZero=noZero?'valid':'invalid'
  let classValidnoBlank=noBlank?'valid':'invalid'
  let classValidlower=containsLower?'valid':'invalid'
  let classValidupper=containsUpper?'valid':'invalid'
  let classCounter=counter>4?'valid':'invalid'
  return (
    <>
    <form  onSubmit={onSubmitHandler}>
      <div className='form-control'>
        <label htmlFor='password'>Password</label>
        <input type={visible?'text':'password'} id='password' onChange={onChangeHandler} onKeyPress={onKeyPressHandler} /><i class={visible?"fas fa-eye-slash":"fas fa-eye"} onClick={visibleHandler}></i>
      </div>
      <div className="form-actions">
        <button className={buttonClass}>Submit</button>
      </div>
    </form>
      <div className='form-control'>
            
      <ul >
      <li><h2>Password must contain the following:</h2></li>
          <li className={classValidSixteen}><i class={minSixteen?"fas fa-check":"fas fa-times"}></i>At least 16 characters</li>
          <li className={classValidlower}><i class={containsLower?"fas fa-check":"fas fa-times"}></i>Must contain at least one lowercase letter</li>
          <li className={classValidupper}><i class={containsUpper?"fas fa-check":"fas fa-times"}></i>Must contain at least one uppercase letter</li>
          <li className={classCounter}><i class={counter>4?"fas fa-check":"fas fa-times"}></i>Must contain at least 4 numbers</li>
          <li className={classValidnoZero}><i class={noZero?"fas fa-check":"fas fa-times"}></i>Can't use number 0</li>
          <li className={classValidnoBlank}><i class={noBlank?"fas fa-check":"fas fa-times"}></i>Can't use blank spaces</li>
      </ul>
    </div>
    </>
  );
};

export default SimpleInput;
