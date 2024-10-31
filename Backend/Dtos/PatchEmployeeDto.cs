namespace Backend.Dtos
{
    public class PatchEmployeeDto
    {
        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public string? email { get; set; }
        public DateTime? dateOfBirth { get; set; }
        public double? salary { get; set; }
        public string? departmentId { get; set; }
    }
}
