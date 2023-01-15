using System.ComponentModel.DataAnnotations;

namespace GameWebApplication.Models
{
    public class MagicMeleeRanged
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public bool Win { get; set; }
        public bool Loss { get; set; }
        public bool Tie { get; set; }
        public string UserChoice { get; set; }
        public string ComputerChoice { get; set; }
        public TimeSpan TimeToChoice { get; set; }

    }
}
