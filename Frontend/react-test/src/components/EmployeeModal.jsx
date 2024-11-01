import React, { useState, useEffect } from 'react' 
import DatePicker from 'react-datepicker' 
import 'react-datepicker/dist/react-datepicker.css' 
import './EmployeeModal.css' 
import api from '../../api' 

function EmployeeModal({ title, data, onSave, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    departmentId: '',
    dateOfBirth: '',
    salary: '',
  }) 
  const [errors, setErrors] = useState({}) 
  const [departments, setDepartments] = useState([]) 

  useEffect(() => {
    if (data) setFormData(data) 
    fetchDepartments() 
  }, [data]) 

  const fetchDepartments = async () => {
    try {
      const response = await api.get('/Department') 
      setDepartments(response.data.data) 
    } catch (error) {
      console.error('Error fetching departments:', error) 
    }
  } 

  const handleChange = (e) => {
    const { name, value } = e.target 
    setFormData((prevData) => ({ ...prevData, [name]: value })) 
  } 

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, dateOfBirth: date })) 
  } 

  const validate = () => {
    let tempErrors = {} 
    if (!formData.firstName) tempErrors.firstName = 'First name is required' 
    if (!formData.lastName) tempErrors.lastName = 'Last name is required' 
    if (!formData.email) {
      tempErrors.email = 'Email is required' 
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Email is not valid' 
    }
    if (!formData.dateOfBirth)
      tempErrors.dateOfBirth = 'Date of birth is required' 
    if (formData.dateOfBirth > new Date()) {
      tempErrors.dateOfBirth = 'Date of birth cannot be in the future' 
    }
    if (!formData.salary || formData.salary <= 0)
      tempErrors.salary = 'Salary must be a positive number' 
    if (!formData.departmentId)
      tempErrors.departmentId = 'Department ID is required' 

    setErrors(tempErrors) 
    return Object.keys(tempErrors).length === 0 
  } 

  const handleSave = () => {
    if (validate()) {
      onSave(formData) 
    }
  } 

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h3>{title}</h3>
        <form>
          <div className='form-group'>
            <label>First Name</label>
            <input
              type='text'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <span className='error'>{errors.firstName}</span>
            )}
          </div>
          <div className='form-group'>
            <label>Last Name</label>
            <input
              type='text'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <span className='error'>{errors.lastName}</span>
            )}
          </div>
          <div className='form-group'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className='error'>{errors.email}</span>}
          </div>
          <div className='form-group'>
            <label>Department</label>
            <select
              name='departmentId'
              value={formData.departmentId}
              onChange={handleChange}
            >
              <option value=''>Select Department</option>
              {departments.map((dept) => (
                <option key={dept.departmentId} value={dept.departmentId}>
                  {dept.departmentName}
                </option>
              ))}
            </select>
            {errors.departmentId && (
              <span className='error'>{errors.departmentId}</span>
            )}
          </div>
          <div className='form-group'>
            <label>Date of Birth</label>
            <DatePicker
              selected={formData.dateOfBirth}
              onChange={handleDateChange}
              dateFormat='yyyy-MM-dd'
              placeholderText='Select date'
            />
            {errors.dateOfBirth && (
              <span className='error'>{errors.dateOfBirth}</span>
            )}
          </div>
          <div className='form-group'>
            <label>Salary</label>
            <input
              type='number'
              name='salary'
              value={formData.salary}
              onChange={handleChange}
            />
            {errors.salary && <span className='error'>{errors.salary}</span>}
          </div>
        </form>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  ) 
}

export default EmployeeModal 
