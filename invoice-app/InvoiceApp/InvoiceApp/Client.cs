using System.ComponentModel.DataAnnotations.Schema;

namespace InvoiceApp
{
    public class Client
    {
        public int ClientId { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        //[ForeignKey("AddressId")]
        public Address? Address { get; set; }

        public List<Item>? Items { get; set; }
    }
}
