using Backend.Models;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Backend.Dtos;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            var employees = await _employeeRepository.GetAllEmployees();
            if (employees == null || !employees.Any())
            {
                return NotFound(new
                {
                    message = "No employees found.",
                    statusCode = 404
                });
            }

            return Ok(new
            {
                message = "Employees retrieved successfully.",
                statusCode = 200,
                data = employees
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            var employee = await _employeeRepository.GetEmployeeById(id);
            if (employee == null)
            {
                return NotFound(new
                {
                    message = "Employee not found.",
                    statusCode = 404
                });
            }

            return Ok(new
            {
                message = "Employee retrieved successfully.",
                statusCode = 200,
                data = employee
            });
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] AddEmployeeDto employeeDto)
        {
            if (employeeDto == null || string.IsNullOrEmpty(employeeDto.email))
            {
                return BadRequest(new
                {
                    message = "Employee data is incomplete or invalid.",
                    statusCode = 400
                });
            }

            var employee = new Employee
            {
                firstName = employeeDto.firstName,
                lastName = employeeDto.lastName,
                email = employeeDto.email,
                dateOfBirth = employeeDto.dateOfBirth,
                salary = employeeDto.salary,
                departmentId = employeeDto.departmentId,
                age = CalculateAge(employeeDto.dateOfBirth),
                department = null
            };

            await _employeeRepository.AddEmployee(employee);

            return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.employeeId }, new
            {
                message = "Employee added successfully.",
                statusCode = 201,
                data = employee
            });
        }

        private int CalculateAge(DateTime dateOfBirth)
        {
            var today = DateTime.Today;
            var age = today.Year - dateOfBirth.Year;
            if (dateOfBirth.Date > today.AddYears(-age)) age--;
            return age;
        }

        [HttpPatch]
        public async Task<IActionResult> UpdateEmployee([FromQuery] string email, [FromBody] PatchEmployeeDto updatedEmployee)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest(new
                {
                    message = "Email is required to update the employee.",
                    statusCode = 400
                });
            }

            var existingEmployee = await _employeeRepository.GetEmployeeByEmail(email);
            if (existingEmployee == null)
            {
                return NotFound(new
                {
                    message = "Employee not found.",
                    statusCode = 404
                });
            }

            existingEmployee.firstName = updatedEmployee.firstName ?? existingEmployee.firstName;
            existingEmployee.lastName = updatedEmployee.lastName ?? existingEmployee.lastName;
            existingEmployee.email = updatedEmployee.email ?? existingEmployee.email;
            existingEmployee.dateOfBirth = updatedEmployee.dateOfBirth ?? existingEmployee.dateOfBirth;
            existingEmployee.salary = updatedEmployee.salary ?? existingEmployee.salary;
            existingEmployee.departmentId = !string.IsNullOrEmpty(updatedEmployee.departmentId)
                ? updatedEmployee.departmentId
                : existingEmployee.departmentId;

            if (updatedEmployee.dateOfBirth.HasValue)
            {
                existingEmployee.age = CalculateAge(updatedEmployee.dateOfBirth.Value);
            }

            await _employeeRepository.UpdateEmployee(existingEmployee);

            return Ok(new
            {
                message = "Employee updated successfully.",
                statusCode = 200
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var existingEmployee = await _employeeRepository.GetEmployeeById(id);
            if (existingEmployee == null)
            {
                return NotFound(new
                {
                    message = "Employee not found.",
                    statusCode = 404
                });
            }

            await _employeeRepository.DeleteEmployee(id);

            return Ok(new
            {
                message = "Employee deleted successfully.",
                statusCode = 200
            });
        }

        [HttpGet("byEmail")]
        public async Task<IActionResult> GetEmployeeByEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest(new
                {
                    message = "Email is required.",
                    statusCode = 400
                });
            }

            var employee = await _employeeRepository.GetEmployeeByEmail(email);
            if (employee == null)
            {
                return NotFound(new
                {
                    message = "Employee not found.",
                    statusCode = 404
                });
            }

            return Ok(new
            {
                message = "Employee retrieved successfully.",
                statusCode = 200,
                data = employee
            });
        }
    }
}
