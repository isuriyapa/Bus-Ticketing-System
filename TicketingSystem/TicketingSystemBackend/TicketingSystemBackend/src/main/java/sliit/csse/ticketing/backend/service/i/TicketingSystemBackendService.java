package sliit.csse.ticketing.backend.service.i;

import sliit.csse.ticketing.backend.dao.dto.ProcessRequestDto;
import sliit.csse.ticketing.backend.dao.dto.ProcessResponseDto;

public interface TicketingSystemBackendService {
	public ProcessResponseDto getAllUsers(ProcessRequestDto requestDto);
	public ProcessResponseDto updateUser(ProcessRequestDto requestDto);
	public ProcessResponseDto deleteUser(ProcessRequestDto requestDto);
	public ProcessResponseDto getAllInspectors(ProcessRequestDto requestDto);
	
	public ProcessResponseDto getAllBusDrivers(ProcessRequestDto requestDto);
	public ProcessResponseDto getAllConductors(ProcessRequestDto requestDto);
	public ProcessResponseDto addBus(ProcessRequestDto requestDto);
	public ProcessResponseDto getAllBuses(ProcessRequestDto requestDto);
	public ProcessResponseDto assignInspector(ProcessRequestDto requestDto);
	
	public ProcessResponseDto addNewBusRoute(ProcessRequestDto requestDto);
	public ProcessResponseDto getAllBusRoutes(ProcessRequestDto requestDto);
	
	public ProcessResponseDto addSchedule(ProcessRequestDto requestDto);
	public ProcessResponseDto getAllSchedules(ProcessRequestDto requestDto);
	public ProcessResponseDto updateSchedule(ProcessRequestDto requestDto);
	public ProcessResponseDto deleteSchedule(ProcessRequestDto requestDto);
	
	public ProcessResponseDto getAllOffences(ProcessRequestDto requestDto);
	
	public ProcessResponseDto getAllInvalidTickets(ProcessRequestDto requestDto);
	
	public ProcessResponseDto getAllTrips(ProcessRequestDto requestDto);
	
	public ProcessResponseDto getPassengerCounts(ProcessRequestDto requestDto);
	
}
