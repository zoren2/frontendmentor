using System.ComponentModel.DataAnnotations.Schema;

namespace InvoiceApp
{
    public class Sender
    {
        public int Id { get; set; }
        //[ForeignKey("AddressId")]
        public Address? Address { get; set; }
    }
}
