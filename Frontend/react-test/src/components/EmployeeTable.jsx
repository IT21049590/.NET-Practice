import React, { useEffect, useState } from 'react'
import api from '../../api'
import EmployeeModal from './EmployeeModal'
import './EmployeeTable.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function EmployeeTable() {
  const [employees, setEmployees] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/Employee ')
      const employeesWithoutDepartment = response.data.data.map((employee) => {
        const { department, ...rest } = employee
        return rest
      })
      setEmployees(employeesWithoutDepartment)
    } catch (error) {
      console.error('Error fetching employees: ', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/Employee/${id}`)
      toast.success('Employee deleted successfully!')
      fetchEmployees()
    } catch (error) {
      toast.error('Failed to delete employee')
      console.error('Error deleting employee: ', error)
    }
  }

  const handleSave = async (employeeData) => {
    try {
      if (employeeData.employeeId) {
        try {
          await api.patch(
            `/Employee?employeeId=${employeeData.employeeId}`,
            employeeData
          )
          toast.success('Employee Updated successfully!')
        } catch (error) {
          toast.error('Failed to Update employee')
          console.error('Error Updating employee: ', error)
        }
      } else {
        try {
          await api.post('/Employee ', employeeData)
          toast.success('Employee added successfully!')
        } catch (error) {
          toast.error('Failed to add employee')
          console.error('Error Updating employee: ', error)
        }
      }
      fetchEmployees()
      closeModal()
    } catch (error) {
      console.error('Error saving employee: ', error)
    }
  }

  const openModal = (employee = null) => {
    setSelectedEmployee(employee)
    setShowModal(true)
  }

  const closeModal = () => {
    setSelectedEmployee(null)
    setShowModal(false)
  }

  return (
    <div className='table-container '>
      <h2>Employees</h2>
      <button className='add-button ' onClick={() => openModal()}>
        Add Employee
      </button>
      <table className='table '>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.employeeId}>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.email}</td>
              <td>{emp.departmentId}</td>
              <td>
                <button onClick={() => openModal(emp)}>Edit</button>
                <button onClick={() => handleDelete(emp.employeeId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <EmployeeModal
          title={selectedEmployee ? 'Edit Employee ' : 'Add Employee '}
          data={selectedEmployee}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default EmployeeTable
