import React, { useState, useEffect } from "react";
import axios from "axios";
import "./main.css";

const App = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
    age: "",
    gender: "",
    grade: "",
    address: "",
    contact_number: "",
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [toView, setToView] = useState({
    first_name: "",
    last_name: "",
    age: "",
    gender: "",
    grade: "",
    address: "",
    contact_number: "",
  });
  const [openView, setOpenView] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/students/");
      const data = response.data; // Extract the data property
      // console.log(data);
      setStudents(data);
    } catch (error) {
      console.error(error); // Catch any error that might occur and log it
    }
  };

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleAddStudent = async () => {
    try {
      const response = axios.post(
        "http://127.0.0.1:8000/api/students/",
        newStudent
      );

      setStudents([...students, response.data]);
      // reset new student
      setNewStudent({
        first_name: "",
        last_name: "",
        age: "",
        gender: "",
        grade: "",
        address: "",
        contact_number: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <h1>Student Management System</h1>
      <div className="form-container">
        <div className="form-inputs">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={newStudent.first_name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={newStudent.last_name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="age"
            placeholder="21"
            value={newStudent.age}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={newStudent.gender}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="grade"
            placeholder="Grade"
            value={newStudent.grade}
            onChange={handleInputChange}
          />
          <textarea
            name="address"
            placeholder="Address"
            value={newStudent.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="contact_number"
            placeholder="Contact Number"
            value={newStudent.contact_number}
            onChange={handleInputChange}
          />

          <div className="form-buttons">
            {selectedStudent ? (
              <>
                <button>Update</button>
                <button>Cancel</button>
              </>
            ) : (
              <button>Add New Student</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
