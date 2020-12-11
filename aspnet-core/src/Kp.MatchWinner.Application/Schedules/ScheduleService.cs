using Ical.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Kp.MatchWinner.Schedules
{
    public class ScheduleService : ApplicationService, IScheduleService
    //CrudAppService<Schedule, ScheduleDto, Guid, PagedAndSortedResultRequestDto, IFormFile>, IScheduleService
    {
        //readonly IRepository<Schedule, Guid> _repository;
        readonly ScheduleManager _scheduleManager;
        public ScheduleService(ScheduleManager scheduleManager) //: base(repository)
        {
            _scheduleManager = scheduleManager;
            //_matchManager = matchManager;
        }


        public async Task<IEnumerable<ScheduleDto>> UploadAsync(IFormFile File)
        {
            ContentDispositionHeaderValue.Parse(File.ContentDisposition);
            string fileContent = "";
            using (var streamReader = new StreamReader(File.OpenReadStream()))
            {
                fileContent = await streamReader.ReadToEndAsync();

            }
            var cal = Calendar.Load(fileContent);
            var events = cal.Events.Select((x, index) => new
            ScheduleDto
            {
                Location = x.Location,
                HomeTeam = x.Summary.Split(" v ")[0].RemovePreFix(new string[] { $"{index + 1}st Match", $"{index + 1}nd Match", $"{index + 1}rd Match", $"{index + 1}th Match" }).Trim(),//,"Knockout", "Eliminator", "Qualifier", "Final" 
                VisitorTeam = x.Summary.Split(" v ")[1].Trim(),
                StartDate = x.DtStart.Date,
                EndDate = x.DtEnd.Date
            }); ; ;

            return events;
            //return new ScheduleDto();

        }

        public async Task<bool> CreateSchedule(List<ScheduleDto> schedules)
        {
            return await _scheduleManager.BulkInsertAsync(ObjectMapper.Map<List<ScheduleDto>, List<Schedule>>(schedules));

        }

        public async Task<List<ScheduleDto>> GetSchedule() {
            return ObjectMapper.Map<List<Schedule>,List<ScheduleDto>>(await _scheduleManager.GetSchedule());
        }
    }
}
