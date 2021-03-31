using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;

namespace Kp.MatchWinner.MatchAdmin
{
    public class Tournament : FullAuditedEntity<Guid>
    {
        public string TournamentName { get; set; }
        public IEnumerable<TournamentSeason> Seasons { get; set; }
    }

    public class TournamentSeason
    {
        public string Season { get; set; }
        public bool IsAvailable { get; set; }

    }

    public class TournamentComparer : IEqualityComparer<Tournament>
    {
        public bool Equals([AllowNull] Tournament x, [AllowNull] Tournament y)
        {
            if (Object.ReferenceEquals(x, y)) return true;

            if (Object.ReferenceEquals(x, null) || Object.ReferenceEquals(y, null)) return false;

        
            return x.TournamentName == y.TournamentName;
            //&& x.Seasons.Any(s => y.Seasons.Any(ys => ys != s));

        }

        public int GetHashCode([DisallowNull] Tournament obj)
        {
            //Check whether the object is null
            if (Object.ReferenceEquals(obj, null)) return 0;

            //Get hash code for the Name field if it is not null.
            int hashTournamentName = obj.TournamentName == null ? 0 : obj.TournamentName.GetHashCode();

            //Get hash code for the Code field.
            //int hashTournamentSeason = obj.Seasons == null ? 0 : obj.Seasons.GetHashCode();

            //Calculate the hash code for the product.
            return hashTournamentName; 
                //^ hashTournamentSeason;
        }
    }
}
