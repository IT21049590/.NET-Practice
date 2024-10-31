using Backend.Models;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Backend.Dtos;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentController(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetDepartments()
        {
            var departments = await _departmentRepository.GetAllDepartments();

            if (departments == null || !departments.Any())
            {
                return NotFound(new
                {
                    message = "No departments found.",
                    statusCode = 404
                });
            }

            return Ok(new
            {
                message = "Departments retrieved successfully.",
                statusCode = 200,
                data = departments
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDepartmentById(string id)
        {
            var department = await _departmentRepository.GetDepartmentById(id);

            if (department == null)
            {
                return NotFound(new
                {
                    message = "Department not found.",
                    statusCode = 404
                });
            }

            return Ok(new
            {
                message = "Department retrieved successfully.",
                statusCode = 200,
                data = department
            });
        }

        [HttpPost]
        public async Task<IActionResult> AddDepartment(Department department)
        {
            if (string.IsNullOrEmpty(department.departmentId) || string.IsNullOrEmpty(department.departmentName))
            {
                return BadRequest(new
                {
                    message = "Department ID and Department Name are required.",
                    statusCode = 400
                });
            }
            await _departmentRepository.AddDepartment(department);
            return CreatedAtAction(nameof(GetDepartmentById), new { id = department.departmentId }, new
            {
                message = "Department added successfully.",
                statusCode = 201,
                department
            });
        }

        [HttpPatch]
        public async Task<IActionResult> UpdateDepartment([FromQuery] string departmentId, [FromBody] PatchDepartmentDto departmentDto)
        {
            if (string.IsNullOrEmpty(departmentId))
            {
                return BadRequest(new
                {
                    message = "Department ID is required.",
                    statusCode = 400
                });
            }

            var existingDepartment = await _departmentRepository.GetDepartmentById(departmentId);
            if (existingDepartment == null)
            {
                return NotFound(new
                {
                    message = "Department not found.",
                    statusCode = 404
                });
            }

            existingDepartment.departmentName = departmentDto.departmentName ?? existingDepartment.departmentName;
            existingDepartment.departmentLocation = departmentDto.departmentLocation ?? existingDepartment.departmentLocation;

            await _departmentRepository.UpdateDepartment(existingDepartment);
            return Ok(new { message = "Department updated successfully.", statusCode = 200 });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(string id)
        {
            var existingDepartment = await _departmentRepository.GetDepartmentById(id);
            if (existingDepartment == null)
            {
                return NotFound(new { message = "Department not found.", statusCode = 404 });
            }

            await _departmentRepository.DeleteDepartment(id);
            return Ok(new { message = "Department deleted successfully.", statusCode = 200 });
        }
    }
}
