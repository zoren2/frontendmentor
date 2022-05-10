using System.ComponentModel.DataAnnotations.Schema;

namespace InvoiceApp
{
    public class Sender
    {
        public int Id { get; set; }
        [ForeignKey("Invoice")]
        public Guid InvoiceId { get; set; }
        public string Street { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string PostCode { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;

        /*
         * Relationship is self-contained
         */
    }
}
