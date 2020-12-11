using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Kp.MatchWinner.Schedules
{
    public interface IScheduleService : IApplicationService //ICrudAppService<ScheduleDto, Guid, PagedAndSortedResultRequestDto, IFormFile>
    {
        //Task<IEnumerable<ScheduleDto>> CreateScheduleAsync(IFormFile File,string eventName);
    }
}
