using System.ComponentModel.DataAnnotations.Schema;

namespace InvoiceApp
{
    public class Client
    {
        public int Id { get; set; }
        [ForeignKey("Invoice")]
        public Guid InvoiceId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Street { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string PostCode { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;


        /*
         * Relationships
         */
        
        //Client has many items
        public ICollection<Item>? Item { get; set; }
    }
}
