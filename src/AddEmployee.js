
import React,{useState}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom' 
import { Button } from '@mui/material';
import './AddEmployee.css'
import axios from 'axios'; 
export default function AddEmployee()
{
    const[formData,setFormData]=useState({
      emp_name: '',
    emp_dept: '',
    emp_job: '',
    emp_salary: '',
    emp_email: '',
    })
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateEmail = (email) => {
    return emailRegex.test(email);
};

      
    const handleSubmit=async (event)=>
          {
              event.preventDefault();
              if (!validateEmail(formData.emp_email)) {
                alert("Please enter a valid email address.");
                return;
            }
              try{
              const response=await axios.post(`http://localhost:8080/employee/`,formData, {
              headers: {
                  'Content-Type': 'application/json',
              },
              });
              if (response.status === 200 || response.status === 201) {
                  console.log("Navigation triggered after success.");
                  navigate('/');
              } else {
                  console.error("Unexpected response status:", response.status);
              }
              }
              // catch(error){console.log("Error while adding an employee",error)};  
              catch (error) {
                if (error.response) {
                    // Server-side error
                    console.error("Server responded with error:", error.response.data);
                } else if (error.request) {
                    // No response received
                    console.error("No response received:", error.request);
                } else {
                    // Error during request setup
                    console.error("Error in setting up the request:", error.message);
                }
            }
              
          }
    const handleChange=(event)=>{
        const{name,value}=event.target;
        setFormData((prevData)=>({
            ...prevData,[name]:value
        }));
    };

    const navigate=useNavigate();

       return(
        <>
        <div className='container'style={{marginTop:'20px',width:'50%'}}>
        <div className='row'>
        <div className='card'>
        <h2 className='text-center'>Add an Employee</h2>
        <div className='card-body'>
                    <form  class="form-group" onSubmit={handleSubmit}>
                    <div className='form-group mb-10'>
                    {/*<label htmlFor="employeeId">Employee ID:</label>
              <input className='add-form'type="text"id="employeeId"name="employeeId"class="form-control"value={formData.emp_id}
              onChange={handleChange} required/>
              <br/>}*/}
               <label htmlFor="name">Name:</label>
                <input type="text"id="name"name="emp_name"class="form-control"value={formData.emp_name}
              onChange={handleChange} required/> <br/>

              </div>

              <div className='form-group mv-2'>
               <label htmlFor="department">Department:</label>
                <input type="text"id="department"name="emp_dept"class="form-control"value={formData.emp_dept}
              onChange={handleChange} required/> <br/>

              </div>

              <div className='form-group mv-2'>
               <label htmlFor="designation">Designation:</label>
                <input type="text"id="designation"name="emp_job"class="form-control"value={formData.emp_job}
              onChange={handleChange} required/> <br/>

              </div>

              <div className='form-group mv-2'>
               <label htmlFor="employeeId">Salary:</label>
                <input type="text"id="salary"name="emp_salary"class="form-control"value={formData.emp_salary}
              onChange={handleChange} required/> <br/>

              </div>

              <div className='form-group mv-2'>
               <label htmlFor="email">Email:</label>
                <input type="text"id="email"name="emp_email"class="form-control"value={formData.emp_email}
              onChange={handleChange} required/>

              </div>
<br/>
              <Button sx={{ marginRight: 2 }}type="submit"variant="contained" color="success">
  Submit
</Button>
<Button  sx={{ marginRight: 2 }}onClick={()=>navigate('/')} variant="outlined" color="error">
  Cancel
</Button>
              
                    </form>
                </div>
                </div>
                </div>
                </div>

<br></br>

        </>
       );
}
















// import React,{useState}from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {useNavigate} from 'react-router-dom' 
// import { Button } from '@mui/material';
// import './AddEmployee.css'
// export default function AddEmployee()
// {
//     const[formData,setFormData]=useState({})
//     // const handleClickOpen = () => {
//     //     setOpen(true);
//     // };
//     // const handleClickClose = () => {
//     //     setOpen(false);
//     // };
      
//     const handleSubmit=(event)=>
//     {
//         event.preventDefault();
       
//     }
//     const handleChange=(event)=>{
//         const{name,value}=event.target;
//         setFormData((prevData)=>({
//             ...prevData,[name]:value
//         }));
//     };

//     const navigate=useNavigate();

//        return(
//         <>
//         <div>
//                     <form  class="form-group" onSubmit={handleSubmit}>
//                     <label htmlFor="employeeId">Employee ID:</label>
//               <input className='add-form'type="text"id="employeeId"name="employeeId"class="form-control"value={formData.emp_id}
//               onChange={handleChange}required/>
//               <br/>
//                <label htmlFor="name">Name:</label>
//                 <input type="text"id="name"name="name"class="form-control"value={formData.emp_name}
//               onChange={handleChange}required/> <br/>
//                <label htmlFor="department">Department:</label>
//                 <input type="text"id="department"name="department"class="form-control"value={formData.emp_dept}
//               onChange={handleChange}required/> <br/>
//                <label htmlFor="designation">Designation:</label>
//                 <input type="text"id="designation"name="designation"class="form-control"value={formData.emp_job}
//               onChange={handleChange}required/> <br/>
//                <label htmlFor="employeeId">Salary:</label>
//                 <input type="text"id="salary"name="salary"class="form-control"value={formData.emp_salary}
//               onChange={handleChange}required/> <br/>
//                <label htmlFor="email">Email:</label>
//                 <input type="text"id="email"name="email"class="form-control"value={formData.emp_email}
//               onChange={handleChange}required/>
              
//                     </form>
//                 </div>
// <br></br>
// <Button sx={{ marginRight: 2 }}onClick={()=>navigate('/')}variant="contained" color="success">
//   Submit
// </Button>
// <Button  sx={{ marginRight: 2 }}onClick={()=>navigate('/')} variant="outlined" color="error">
//   Cancel
// </Button>
//         </>
//        );
// }