import React, { useEffect, useState } from 'react'
import api from '../../api'
import DepartmentModal from './DepartmentModal'
import { toast } from 'react-toastify'
import './DepartmentTable.css'

function DepartmentTable() {
  const [departments, setDepartments] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState(null)

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      const response = await api.get('/Department')
      setDepartments(response.data.data)
    } catch (error) {
      console.error('Error fetching departments:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/Department/${id}`)
      toast.success('Department deleted successfully!')
      fetchDepartments()
    } catch (error) {
      toast.error('Failed to delete Department')
      console.error('Error deleting department:', error)
    }
  }

  const handleSave = async (departmentData) => {
    try {
      if (departmentData.departmentId) {
        try {
          await api.patch(
            `/Department?departmentId=${departmentData.departmentId}`,
            departmentData
          )
          toast.success('Department updated successfully!')
        } catch (error) {
          toast.error('Failed to update Department')
          console.error('Error updating department:', error)
        }
      } else {
        try {
          await api.post('/Department', departmentData)
          toast.success('Department added successfully!')
        } catch (error) {
          toast.error('Failed to add Department')
          console.error('Error addinng department:', error)
        }
      }
      fetchDepartments()
      closeModal()
    } catch (error) {
      console.error('Error saving department:', error)
    }
  }

  const openModal = (department = null) => {
    setSelectedDepartment(department)
    setShowModal(true)
  }

  const closeModal = () => {
    setSelectedDepartment(null)
    setShowModal(false)
  }

  return (
    <div className='table-container '>
      <h2>Departments</h2>
      <button className='add-button ' onClick={() => openModal()}>
        Add Department
      </button>
      <table className='table '>
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department Name</th>
            <th>Department Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dep) => (
            <tr key={dep.departmentId}>
              <td>{dep.departmentId}</td>
              <td>{dep.departmentName}</td>
              <td>{dep.departmentLocation}</td>
              <td>
                <button onClick={() => openModal(dep)}>Edit</button>
                <button onClick={() => handleDelete(dep.departmentId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <DepartmentModal
          title={selectedDepartment ? 'Edit Department' : 'Add Department'}
          data={selectedDepartment}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default DepartmentTable
