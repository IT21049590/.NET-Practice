import React, { useState, useEffect } from 'react' 
import './DepartmentModal.css' 

function DepartmentModal({ title, data, onSave, onClose }) {
  const [formData, setFormData] = useState({
    departmentId: '',
    departmentName: '',
    departmentLocation: '',
  }) 
  const [errors, setErrors] = useState({}) 

  useEffect(() => {
    if (data) setFormData(data) 
  }, [data]) 

  const handleChange = (e) => {
    const { name, value } = e.target 
    setFormData((prevData) => ({ ...prevData, [name]: value })) 
  } 

  const validate = () => {
    let tempErrors = {} 
    if (!formData.departmentId) tempErrors.departmentId = 'Department ID is required' 
    if (!formData.departmentName) tempErrors.departmentName = 'Department Name is required' 
    if (!formData.departmentLocation) tempErrors.departmentLocation = 'Department Location is required' 
    
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
            <label>Department ID</label>
            <input
              type='text'
              name='departmentId'
              value={formData.departmentId}
              onChange={handleChange}
            />
            {errors.departmentId && <span className='error'>{errors.departmentId}</span>}
          </div>
          <div className='form-group'>
            <label>Department Name</label>
            <input
              type='text'
              name='departmentName'
              value={formData.departmentName}
              onChange={handleChange}
            />
            {errors.departmentName && <span className='error'>{errors.departmentName}</span>}
          </div>
          <div className='form-group'>
            <label>Department Location</label>
            <input
              type='text'
              name='departmentLocation'
              value={formData.departmentLocation}
              onChange={handleChange}
            />
            {errors.departmentLocation && <span className='error'>{errors.departmentLocation}</span>}
          </div>
        </form>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  ) 
}

export default DepartmentModal 
