import React, { useState, useEffect } from "react";
import axios from "axios";
import "./main.css";

const App = () => {
  const defaultStudentValue = {
    first_name: "",
    last_name: "",
    age: "",
    gender: "",
    grade: "",
    address: "",
    contact_number: "",
  };
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState(defaultStudentValue);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [toView, setToView] = useState(defaultStudentValue);
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
      setNewStudent(defaultStudentValue);
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewClick = async (id) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/students/${id}`
    );

    setToView(response.data);
    setOpenView(true);
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setNewStudent(student);
  };

  const handleUpdateStudent = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/students/${selectedStudent.id}/`,
        newStudent
      );
      fetchStudents();
      setOpenView(false);
      setNewStudent(defaultStudentValue);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelUpdateStudent = () => {
    setSelectedStudent(null);
    setNewStudent(defaultStudentValue);
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/students/${id}/`
      );
      fetchStudents();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <h1>Student Management System</h1>
      {/* Form Container */}
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
                <button onClick={handleUpdateStudent}>Update</button>
                <button onClick={handleCancelUpdateStudent}>Cancel</button>
              </>
            ) : (
              <button onClick={handleAddStudent}>Add New Student</button>
            )}
          </div>
        </div>
      </div>

      {/* Student List */}
      <ul className="student-list">
        {students.map((student) => {
          return (
            <li key={student.id}>
              <div>
                <strong>
                  {student.first_name} {student.last_name}
                </strong>
              </div>
              <div className="actions">
                <button
                  className="view"
                  onClick={() => handleViewClick(student.id)}
                >
                  View
                </button>
                <button
                  className="edit"
                  onClick={() => handleEditClick(student)}
                >
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => handleDeleteClick(student.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Single View */}
      {openView && (
        <>
          <div className="outer-box">
            <strong>
              {toView.first_name} {toView.last_name}
            </strong>
            <br />
            <span>Age : {toView.age}</span>
            <br />
            <span>Gender: {toView.gender}</span>
            <br />
            <span>Grade: {toView.grade}</span>
            <br />
            <span>Address: {toView.address}</span>
            <br />
            <span>Contact Number: {toView.contact_number}</span>
            <br />
          </div>
          <button onClick={() => setOpenView(false)}>Close</button>
        </>
      )}
    </div>
  );
};

export default App;
