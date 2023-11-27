package sliit.csse.ticketing.backend.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import sliit.csse.ticketing.backend.dao.dto.ProcessRequestDto;
import sliit.csse.ticketing.backend.dao.dto.ProcessResponseDto;
import sliit.csse.ticketing.backend.service.i.TicketingSystemBackendService;
import sliit.csse.ticketing.backend.util.common.REST_CONTROLLER_URL;


@RestController
@CrossOrigin
public class TicketingSystemController {

	@Autowired
	TicketingSystemBackendService backendService;
	
	@RequestMapping(value = REST_CONTROLLER_URL.GET_ALL_USERS, method = RequestMethod.POST)
	public @ResponseBody ProcessResponseDto getAllUsers(@RequestBody ProcessRequestDto processRequestDto, HttpServletRequest request){
		ProcessResponseDto responseDto = new ProcessResponseDto();	
		responseDto = backendService.getAllUsers(processRequestDto);
		return responseDto;
	}
	@RequestMapping(value = REST_CONTROLLER_URL.UPDATE_USER, method = RequestMethod.POST)
	public @ResponseBody ProcessResponseDto updateUser(@RequestBody ProcessRequestDto processRequestDto, HttpServletRequest request){
		ProcessResponseDto responseDto = new ProcessResponseDto();	
		responseDto = backendService.updateUser(processRequestDto);
		return responseDto;
	}
	@RequestMapping(value = REST_CONTROLLER_URL.DELETE_USER, method = RequestMethod.POST)
	public @ResponseBody ProcessResponseDto deleteUser(@RequestBody ProcessRequestDto processRequestDto, HttpServletRequest request){
		ProcessResponseDto responseDto = new ProcessResponseDto();	
		responseDto = backendService.deleteUser(processRequestDto);
		return responseDto;
	}
	@RequestMapping(value = REST_CONTROLLER_URL.GET_ALL_DRIVERS, method = RequestMethod.POST)
	public @ResponseBody ProcessResponseDto getAllBusDrivers(@RequestBody ProcessRequestDto processRequestDto, HttpServletRequest request){
		ProcessResponseDto responseDto = new ProcessResponseDto();	
		responseDto = backendService.getAllBusDrivers(processRequestDto);
		return responseDto;
	}
	@RequestMapping(value = REST_CONTROLLER_URL.GET_ALL_CONDUCTORS, method = RequestMethod.POST)
	public @ResponseBody ProcessResponseDto getAllConductors(@RequestBody ProcessRequestDto processRequestDto, HttpServletRequest request){
		ProcessResponseDto responseDto = new ProcessResponseDto();	
		responseDto = backendService.getAllConductors(processRequestDto);
		return responseDto;
	}
	@RequestMapping(value = REST_CONTROLLER_URL.ADD_BUS, method = RequestMethod.POST)
	public @ResponseBody ProcessResponseDto addBus(@RequestBody ProcessRequestDto processRequestDto, HttpServletRequest request){
		ProcessResponseDto responseDto = new ProcessResponseDto();	
		responseDto = backendService.addBus(processRequestDto);
		return responseDto;
	}
	@RequestMapping(value = REST_CONTROLLER_URL.GET_ALL_BUSES, method = RequestMethod.POST)
	public @ResponseBody ProcessResponseDto getAllBuses(@RequestBody ProcessRequestDto processRequestDto, HttpServletRequest request){
		ProcessResponseDto responseDto = new ProcessResponseDto();	
		responseDto = backendService.getAllBuses(processRequestDto);
		return responseDto;
	}
	@RequestMapping(value = REST_CONTROLLER_URL.ADD_ROUTE, method = RequestMethod.POST)
	public @ResponseBody ProcessResponseDto addNewBusRoute(@RequestBody ProcessRequestDto processRequestDto, HttpServletRequest request){
		ProcessResponseDto responseDto = new ProcessResponseDto();	
		responseDto = backendService.addNewBusRoute(processRequestDto);
		return responseDto;
	}
	@RequestMapping(value = REST_CONTROLLER_URL.GET_ALL_ROUTES, method = RequestMethod.POST)
	public @ResponseBody ProcessResponseDto getAllBusRoutes(@RequestBody ProcessRequestDto processRequestDto, HttpServletRequest request){
		ProcessResponseDto responseDto = new ProcessResponseDto();	
		responseDto = backendService.getAllBusRoutes(processRequestDto);
		return responseDto;
	}
	@RequestMapping(value = REST_CONTROLLER_URL.ADD_SCHEDULE, method = RequestMethod.POST)
	public @ResponseBody ProcessResponseDto addSchedule(@RequestBody ProcessRequestDto processRequestDto, HttpServletRequest request){
		ProcessResponseDto responseDto = new ProcessResponseDto();	
		responseDto = backendService.addSchedule(processRequestDto);
		return responseDto;
	}
	@RequestMapping(value = REST_CONTROLLER_URL.GET_ALL_SCHEDULES, method = RequestMethod.POST)
	public @ResponseBody ProcessResponseDto getAllSchedules(@RequestBody ProcessRequestDto processRequestDto, HttpServletRequest request){
		ProcessResponseDto responseDto = new ProcessResponseDto();	
		responseDto = backendService.getAllSchedules(processRequestDto);
		return responseDto;
	}
	@RequestMapping(value = REST_CONTROLLER_URL.UPDATE_SCHEDULE, method = RequestMethod.POST)
	public @ResponseBody ProcessResponseDto updateSchedule(@RequestBody ProcessRequestDto processRequestDto, HttpServletRequest request){
		ProcessResponseDto responseDto = new ProcessResponseDto();	
		responseDto = backendService.updateSchedule(processRequestDto);
		return responseDto;
	}
	@RequestMapping(value = REST_CONTROLLER_URL.DELETE_SCHEDULE, method = RequestMethod.POST)
	public @ResponseBody ProcessResponseDto deleteSchedule(@RequestBody ProcessRequestDto processRequestDto, HttpServletRequest request){
		ProcessResponseDto responseDto = new ProcessResponseDto();	
		responseDto = backendService.deleteSchedule(processRequestDto);
		return responseDto;
	}
	@RequestMapping(value = REST_CONTROLLER_URL.GET_ALL_INSPECTORS, method = RequestMethod.POST)
	public @ResponseBody ProcessResponseDto getAllInspectors(@RequestBody ProcessRequestDto processRequestDto, HttpServletRequest request){
		ProcessResponseDto responseDto = new ProcessResponseDto();	
		responseDto = backendService.getAllInspectors(processRequestDto);
		return responseDto;
	}
	
	@RequestMapping(value = REST_CONTROLLER_URL.ASSIGN_INSPECTOR, method = RequestMethod.POST)
	public @ResponseBody ProcessResponseDto assignInspector(@RequestBody ProcessRequestDto processRequestDto, HttpServletRequest request){
		ProcessResponseDto responseDto = new ProcessResponseDto();	
		responseDto = backendService.assignInspector(processRequestDto);
		return responseDto;
	}
	@RequestMapping(value = REST_CONTROLLER_URL.GET_ALL_OFFENCES, method = RequestMethod.POST)
	public @ResponseBody ProcessResponseDto getAllOffences(@RequestBody ProcessRequestDto processRequestDto, HttpServletRequest request){
		ProcessResponseDto responseDto = new ProcessResponseDto();	
		responseDto = backendService.getAllOffences(processRequestDto);
		return responseDto;
	}
	@RequestMapping(value = REST_CONTROLLER_URL.GET_ALL_INVALID_TICKETS, method = RequestMethod.POST)
	public @ResponseBody ProcessResponseDto getAllInvalidTickets(@RequestBody ProcessRequestDto processRequestDto, HttpServletRequest request){
		ProcessResponseDto responseDto = new ProcessResponseDto();	
		responseDto = backendService.getAllInvalidTickets(processRequestDto);
		return responseDto;
	}
	@RequestMapping(value = REST_CONTROLLER_URL.GET_ALL_TRIPS, method = RequestMethod.POST)
	public @ResponseBody ProcessResponseDto getAllTrips(@RequestBody ProcessRequestDto processRequestDto, HttpServletRequest request){
		ProcessResponseDto responseDto = new ProcessResponseDto();	
		responseDto = backendService.getAllTrips(processRequestDto);
		return responseDto;
	}
	@RequestMapping(value = REST_CONTROLLER_URL.GET_PASSENGER_COUNTS, method = RequestMethod.POST)
	public @ResponseBody ProcessResponseDto getPassengerCounts(@RequestBody ProcessRequestDto processRequestDto, HttpServletRequest request){
		ProcessResponseDto responseDto = new ProcessResponseDto();	
		responseDto = backendService.getPassengerCounts(processRequestDto);
		return responseDto;
	}
	
	@RequestMapping(value = "/test", method = RequestMethod.POST)
	public @ResponseBody ProcessResponseDto test(@RequestBody ProcessRequestDto processRequestDto, HttpServletRequest request){
		ProcessResponseDto responseDto = new ProcessResponseDto();	
		responseDto = backendService.getAllTrips(processRequestDto);
		return responseDto;
	}
	
	
	
}
