using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceApp
{
    public class Invoice
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid Id { get; set; }

        public Client Client { get; set; }

        public Sender Sender { get; set; }
   
        public string Status { get; set; }

        public string PaymentTerms { get; set; }

        public double TotalDue { get; set; } = 0.00;
    }
}
