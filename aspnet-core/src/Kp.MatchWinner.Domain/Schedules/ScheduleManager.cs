using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;

namespace Kp.MatchWinner.Schedules
{
    public class ScheduleManager:DomainService
    {
        readonly IRepository<Schedule, Guid> _scheduleRepository;

        public ScheduleManager(IRepository<Schedule, Guid> scheduleRepository)
        {
            _scheduleRepository = scheduleRepository;
        }

        public async  Task<bool> BulkInsertAsync(List<Schedule> Schedules) {

            foreach (var item in Schedules)
            {
                await _scheduleRepository.InsertAsync(item);
            }
            return true;
        }

        public async Task<List<Schedule>> GetSchedule() {

            return await _scheduleRepository.GetListAsync();
        }

    }
}
