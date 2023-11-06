import { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';
import  Button  from 'react-bootstrap/Button';

export default function Login() {

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [status,setStatus]=useState(false);
  const [status1,setStatus1]=useState(true);
  const [otp,setOtp]=useState(0);
  const [authOtp,setAuthOtp]=useState('');
  const [authMessage,setAuthMessage]=useState('');

  const handleSubmit=async()=>{
    if(email==='' || password==='' || status===false)
    {
      setAuthMessage('Enter all the Details');
    }
    else{
      setAuthMessage('');
      
      let response=await fetch('http://localhost:80/api', {

        method: 'POST', 
        mode: 'cors', 
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({email:email,password:password}) // body data type must match "Content-Type" header

      })
      let data=await response.json();
      // console.log(data);
      setAuthOtp(data.otp);
      setStatus1(false);


    }
  }

  const handleOtp=()=>{
    // alert('Success');
    // console.log(otp)
    // console.log(authOtp)
    if(otp==='' || otp!=authOtp)
      setAuthMessage('Enter Correct OTP');
    else{
      alert('Logged In Successfully');
      window.location='/'
    }
  }

  return (
    <>
      <form onSubmit={e => e.preventDefault()}>

      <MDBContainer fluid>

        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>

            <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
              <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">Please enter your login and password!</p>

                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLgEmail' type='email' size="lg" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLgPassword' type='password' size="lg" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

                <ReCAPTCHA sitekey="6Ldz9_woAAAAAGjBgXr94OrgDciHmD7S7WL9CYW1" required onChange={()=>{setStatus(true)}}/>
                
                <br></br>

                <Button type='submit' className='mx-2 px-5' color='white' size='lg' onClick={handleSubmit}>
                  Login
                </Button>

                <span>{authMessage}</span>
                
                <br />

                <div hidden={status1}>

                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='OTP' id='formControlLgOtp' type='number' size="lg" required value={otp} onChange={(e)=>{setOtp(e.target.value)}}/>
                  <Button type='submit' className='mx-2 px-5' color='white' size='lg' onClick={handleOtp}>
                    Verify
                  </Button>

                </div>

              </MDBCardBody>
            </MDBCard>

          </MDBCol>
        </MDBRow>

      </MDBContainer>  
      </form>

    </>
  )
}
