
import React, { use, useEffect,Link} from 'react'; 
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Listing.css'; 
import IconButton from '@mui/material/IconButton'; 
import AddIcon from '@mui/icons-material/Add'; 
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteIcon from '@mui/icons-material/Delete'; 
import { useState } from 'react'; 
import axios from 'axios'; 

export default function Listing() { 
    const dummyData = [
        { 
            emp_id: 1, 
            emp_name: "John Doe", 
            emp_dept: "Engineering", 
            emp_job: "Software Engineer", 
            emp_salary: "$75,000", 
            emp_email: "john.doe@example.com" 
        }, 
        { 
            emp_id: 2, 
            emp_name: "Jane Smith", 
            emp_dept: "Marketing", 
            emp_job: "Marketing Manager", 
            emp_salary: "$65,000", 
            emp_email: "jane.smith@example.com" 
        }, 
        { 
            emp_id: 3, 
            emp_name: "Sam Wilson", 
            emp_dept: "Sales", 
            emp_job: "Sales Executive", 
            emp_salary: "$50,000", 
            emp_email: "sam.wilson@example.com" 
        }
    ];
    const listOfEmployees = () => axios.get('http://localhost:8080/employee/');

    const [employeeDetails, setEmployeeDetails] = useState([]);

    useEffect(() => {
        listOfEmployees().then((response) => {
            setEmployeeDetails(response.data);
            console.log("API Response Data:", response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    

   const navigate=useNavigate();
   const routeChange=()=>{navigate('/add')};
    const handleEdit = (id) => {navigate(`/edit/${id}`)};
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/employee/${id}`).
        then((response)=>{
            setEmployeeDetails(prevEmployees=>prevEmployees.filter(employee=>employee.emp_id!=id));
            console.log("Employee Deleted successfully");
        }).catch((error)=>{
           console.log("error ",error)
        });
    };

   

    return (
        <>
            <h1>Employee Management System</h1>
            <div className='add-icon'>
                <IconButton  onClick={routeChange} color="primary" aria-label="add"  sx={{
                    backgroundColor: 'blue', 
                    color: 'white', 
                    '&:hover': {
                        backgroundColor: 'darkblue', 
                    },
                }}>
                    <AddIcon fontSize='large' />
                </IconButton>
            </div>
            <br />
 
          





            <table className="table table-bordered table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Salary</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeDetails.map(employee => (
                        <tr key={employee.emp_id}>
                            <td>{employee.emp_id}</td>
                            <td>{employee.emp_name}</td>
                            <td>{employee.emp_dept}</td>
                            <td>{employee.emp_job}</td>
                            <td>{employee.emp_salary}</td>
                            <td>{employee.emp_email}</td>
                            <td>
                                <IconButton onClick={()=>handleEdit(employee.emp_id)} sx={{
                                    backgroundColor: 'blue', 
                                    color: 'white', 
                                    '&:hover': {
                                        backgroundColor: 'darkblue', 
                                    },
                                }}>
                                    <EditIcon />
                                </IconButton>
                            </td>
                            <td>
                                <IconButton onClick={() => handleDelete(employee.emp_id)} sx={{
                                    backgroundColor: 'red',
                                    color: 'white', 
                                    '&:hover': {
                                        backgroundColor: 'pink',
                                    },
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}



















// import React, { use, useEffect,Link} from 'react'; 
// import {useNavigate} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import './Listing.css'; 
// import IconButton from '@mui/material/IconButton'; 
// import AddIcon from '@mui/icons-material/Add'; 
// import EditIcon from '@mui/icons-material/Edit'; 
// import DeleteIcon from '@mui/icons-material/Delete'; 
// import { useState } from 'react'; 
// import axios from 'axios'; 

// export default function Listing() { 
//     const dummyData = [
//         { 
//             emp_id: 1, 
//             emp_name: "John Doe", 
//             emp_dept: "Engineering", 
//             emp_job: "Software Engineer", 
//             emp_salary: "$75,000", 
//             emp_email: "john.doe@example.com" 
//         }, 
//         { 
//             emp_id: 2, 
//             emp_name: "Jane Smith", 
//             emp_dept: "Marketing", 
//             emp_job: "Marketing Manager", 
//             emp_salary: "$65,000", 
//             emp_email: "jane.smith@example.com" 
//         }, 
//         { 
//             emp_id: 3, 
//             emp_name: "Sam Wilson", 
//             emp_dept: "Sales", 
//             emp_job: "Sales Executive", 
//             emp_salary: "$50,000", 
//             emp_email: "sam.wilson@example.com" 
//         }
//     ];
//     const listOfEmployees = () => axios.get('http://localhost:8080/employee/');

//     const [employeeDetails, setEmployeeDetails] = useState([]);

//     useEffect(() => {
//         listOfEmployees().then((response) => {
//             setEmployeeDetails(response.data);
//             console.log("API Response Data:", response.data);
//         }).catch((error) => {
//             console.log(error);
//         });
//     }, []);
    

//    const navigate=useNavigate();
//    const routeChange=()=>{navigate('/add')};
//     const handleEdit = () => {};
//     const handleDelete = (id) => {
//         // axios.delete(`http://localhost:8080/employee/${id}`).
//         // then((response)=>{
//             setEmployeeDetails(prevEmployees=>prevEmployees.filter(employee=>employee.emp_id!=id));
//             console.log("Employee Deleted successfully");
//         // }).catch((error)=>{
//         //    console.log("error ",error)
//         // });
//     };

   

//     return (
//         <>
//             <h1>Employee Management System</h1>
//             <div className='add-icon'>
//                 <IconButton  onClick={routeChange} color="primary" aria-label="add">
//                     <AddIcon fontSize='large' />
//                 </IconButton>
//             </div>
//             <br />
 
          





//             <table className="table table-bordered table table-hover">
//                 <thead className="thead-dark">
//                     <tr>
//                         <th>Employee ID</th>
//                         <th>Employee Name</th>
//                         <th>Department</th>
//                         <th>Designation</th>
//                         <th>Salary</th>
//                         <th>Email</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {employeeDetails.map(employee => (
//                         <tr key={employee.emp_id}>
//                             <td>{employee.emp_id}</td>
//                             <td>{employee.emp_name}</td>
//                             <td>{employee.emp_dept}</td>
//                             <td>{employee.emp_job}</td>
//                             <td>{employee.emp_salary}</td>
//                             <td>{employee.emp_email}</td>
//                             <td>
//                                 <IconButton onClick={() => handleEdit(employee.emp_id)}>
//                                     <EditIcon />
//                                 </IconButton>
//                             </td>
//                             <td>
//                                 <IconButton onClick={() => handleDelete(employee.emp_id)}>
//                                     <DeleteIcon />
//                                 </IconButton>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </>
//     );
// }
