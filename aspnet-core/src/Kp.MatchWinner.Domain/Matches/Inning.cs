using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kp.MatchWinner.Matches
{
    public class Inning
    {
        public string Team { get; set; }
        public string[] AbsentHurt { get; set; }
        private Dictionary<string, Delivery>[] _deliveries;
        public Dictionary<string, Delivery>[] Deliveries
        {
            get { return _deliveries; }
            set
            {
                _deliveries = new Dictionary<string, Delivery>[value.Length];
                for (int i = 0; i < value.Length; i++)
                {
                    _deliveries[i] = new Dictionary<string, Delivery>();
                    foreach (var item in value[i])
                    {
                        _deliveries[i].Add(item.Key.Replace(".", ""), item.Value);
                    }
                }
            }
        }
    }
}
