namespace Project.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public int RoleID { get; set; }
        public DateTime DateBirth {  get; set; }
        public string Phone {  get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime UpdatedTime { get; set;}
        public DateTime? DeletedTime { get; set; }



    }
}
