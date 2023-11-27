package sliit.csse.ticketing.backend.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sliit.csse.ticketing.backend.dao.domain.AppUser;
import sliit.csse.ticketing.backend.dao.domain.Bus;
import sliit.csse.ticketing.backend.dao.domain.InvalidTicket;
import sliit.csse.ticketing.backend.dao.domain.Offence;
import sliit.csse.ticketing.backend.dao.domain.PassengerTrip;
import sliit.csse.ticketing.backend.dao.domain.Route;
import sliit.csse.ticketing.backend.dao.domain.Schedule;
import sliit.csse.ticketing.backend.dao.domain.Trip;
import sliit.csse.ticketing.backend.dao.dto.ProcessRequestDto;
import sliit.csse.ticketing.backend.dao.dto.ProcessResponseDto;
import sliit.csse.ticketing.backend.enums.UserRole;
import sliit.csse.ticketing.backend.repository.BusHaltRepository;
import sliit.csse.ticketing.backend.repository.BusRepository;
import sliit.csse.ticketing.backend.repository.InvalidTicketRepository;
import sliit.csse.ticketing.backend.repository.JwtUserRepository;
import sliit.csse.ticketing.backend.repository.OffenceRepository;
import sliit.csse.ticketing.backend.repository.PassengerTokenRepository;
import sliit.csse.ticketing.backend.repository.PassengerTripRepository;
import sliit.csse.ticketing.backend.repository.RouteRepository;
import sliit.csse.ticketing.backend.repository.ScheduleRepository;
import sliit.csse.ticketing.backend.repository.TripRepository;
import sliit.csse.ticketing.backend.service.i.TicketingSystemBackendService;

@Service
public class TicketingSystemBackendServiceImpl implements TicketingSystemBackendService{
	
	@Autowired JwtUserRepository userRepo;
	@Autowired PassengerTokenRepository passengerTokenRepo;
	@Autowired BusHaltRepository busHaltRepo;
	@Autowired BusRepository busRepo;
	@Autowired InvalidTicketRepository invalidTicketRepo;
	@Autowired OffenceRepository offenceRepo;
	@Autowired PassengerTripRepository passengerTripRepo;
	@Autowired RouteRepository routeRepo;
	@Autowired ScheduleRepository scheduleRepo;
	@Autowired TripRepository tripRepo;
	
	

	@Override
	public ProcessResponseDto getAllUsers(ProcessRequestDto requestDto) {
		ProcessResponseDto responseDto = new ProcessResponseDto();
		try {
			List<AppUser> users = userRepo.findAll();
			responseDto.setUsers(users);
			responseDto.setSuccess(true);
		}catch (Exception e) {
			responseDto.setSuccess(false);
			System.out.println("getAllUsers : " + e);
		}
		return responseDto;
	}

	@Transactional
	public ProcessResponseDto updateUser(ProcessRequestDto requestDto) {
		ProcessResponseDto responseDto = new ProcessResponseDto();
		try {
			if(requestDto.getUser() != null) {
				userRepo.save(requestDto.getUser());
				responseDto.setSuccess(true);
			}
			
		}catch (Exception e) {
			responseDto.setSuccess(false);
			System.out.println("updateUser : " + e);
		}
		return responseDto;
	}

	@Override
	public ProcessResponseDto deleteUser(ProcessRequestDto requestDto) {
		ProcessResponseDto responseDto = new ProcessResponseDto();
		try {
			if(requestDto.getUser() != null) {
				userRepo.deleteById(requestDto.getUser().getId());
				responseDto.setSuccess(true);
			}
			
		}catch (Exception e) {
			responseDto.setSuccess(false);
			System.out.println("deleteUser : " + e);
		}
		return responseDto;
	}

	@Override
	public ProcessResponseDto getAllBusDrivers(ProcessRequestDto requestDto) {
		ProcessResponseDto responseDto = new ProcessResponseDto();
		try {
			List<AppUser> drivers = userRepo.findByRole(UserRole.DRIVER);
			responseDto.setDrivers(drivers);
			responseDto.setSuccess(true);
		}catch (Exception e) {
			responseDto.setSuccess(false);
			System.out.println("getAllBusDrivers : " + e);
		}
		return responseDto;
	}

	@Override
	public ProcessResponseDto getAllConductors(ProcessRequestDto requestDto) {
		ProcessResponseDto responseDto = new ProcessResponseDto();
		try {
			List<AppUser> conductors = userRepo.findByRole(UserRole.CONDUCTOR);
			responseDto.setConductors(conductors);
			responseDto.setSuccess(true);
		}catch (Exception e) {
			responseDto.setSuccess(false);
			System.out.println("getAllConductors : " + e);
		}
		return responseDto;
	}

	@Override
	public ProcessResponseDto addBus(ProcessRequestDto requestDto) {
		ProcessResponseDto responseDto = new ProcessResponseDto();
		try {
			if(requestDto.getBus() != null) {
				busRepo.save(requestDto.getBus());
				responseDto.setSuccess(true);
			}
			
		}catch (Exception e) {
			responseDto.setSuccess(false);
			System.out.println("addBus : " + e);
		}
		return responseDto;
	}

	@Override
	public ProcessResponseDto getAllBuses(ProcessRequestDto requestDto) {
		ProcessResponseDto responseDto = new ProcessResponseDto();
		try {
			List<Bus> busList = busRepo.findAll();
			responseDto.setBusList(busList);
			responseDto.setSuccess(true);
		}catch (Exception e) {
			responseDto.setSuccess(false);
			System.out.println("getAllBuses : " + e);
		}
		return responseDto;
	}

	@Transactional
	public ProcessResponseDto addNewBusRoute(ProcessRequestDto requestDto) {
		ProcessResponseDto responseDto = new ProcessResponseDto();
		try {
			if(requestDto.getRoute() != null) {
				routeRepo.save(requestDto.getRoute());
				responseDto.setSuccess(true);
			}
			
		}catch (Exception e) {
			responseDto.setSuccess(false);
			System.out.println("addNewBusRoute : " + e);
		}
		return responseDto;
	}

	@Override
	public ProcessResponseDto getAllBusRoutes(ProcessRequestDto requestDto) {
		ProcessResponseDto responseDto = new ProcessResponseDto();
		try {
			List<Route> routes = routeRepo.findAll();
			responseDto.setRoutes(routes);
			responseDto.setSuccess(true);
		}catch (Exception e) {
			responseDto.setSuccess(false);
			System.out.println("getAllBusRoutes : " + e);
		}
		return responseDto;
	}

	@Override
	public ProcessResponseDto addSchedule(ProcessRequestDto requestDto) {
		ProcessResponseDto responseDto = new ProcessResponseDto();
		try {
			if(requestDto.getSchedule() != null) {
				scheduleRepo.save(requestDto.getSchedule());
				responseDto.setSuccess(true);
			}
			
		}catch (Exception e) {
			responseDto.setSuccess(false);
			System.out.println("addSchedule : " + e);
		}
		return responseDto;
	}

	@Override
	public ProcessResponseDto getAllSchedules(ProcessRequestDto requestDto) {
		ProcessResponseDto responseDto = new ProcessResponseDto();
		try {
			List<Schedule> schedules = scheduleRepo.findAll();
			responseDto.setSchedules(schedules);
			responseDto.setSuccess(true);
		}catch (Exception e) {
			responseDto.setSuccess(false);
			System.out.println("getAllSchedules : " + e);
		}
		return responseDto;
	}

	@Override
	public ProcessResponseDto updateSchedule(ProcessRequestDto requestDto) {
		ProcessResponseDto responseDto = new ProcessResponseDto();
		try {
			if(requestDto.getSchedule() != null) {
				scheduleRepo.save(requestDto.getSchedule());
				responseDto.setSuccess(true);
			}
			
		}catch (Exception e) {
			responseDto.setSuccess(false);
			System.out.println("updateSchedule : " + e);
		}
		return responseDto;
	}

	@Override
	public ProcessResponseDto deleteSchedule(ProcessRequestDto requestDto) {
		ProcessResponseDto responseDto = new ProcessResponseDto();
		try {
			if(requestDto.getSchedule() != null) {
				scheduleRepo.deleteById(requestDto.getSchedule().getId());
				responseDto.setSuccess(true);
			}
			
		}catch (Exception e) {
			responseDto.setSuccess(false);
			System.out.println("deleteSchedule : " + e);
		}
		return responseDto;
	}

	@Override
	public ProcessResponseDto getAllInspectors(ProcessRequestDto requestDto) {
		ProcessResponseDto responseDto = new ProcessResponseDto();
		try {
			List<AppUser> inspectors = userRepo.findByRole(UserRole.INSPECTOR);
			responseDto.setInspectors(inspectors);
			responseDto.setSuccess(true);
		}catch (Exception e) {
			responseDto.setSuccess(false);
			System.out.println("getAllBusDrivers : " + e);
		}
		return responseDto;
	}

	@Override
	public ProcessResponseDto assignInspector(ProcessRequestDto requestDto) {
		ProcessResponseDto responseDto = new ProcessResponseDto();
		try {
			if(requestDto.getBus() != null) {
				busRepo.save(requestDto.getBus());
				responseDto.setSuccess(true);
			}
			
		}catch (Exception e) {
			responseDto.setSuccess(false);
			System.out.println("assignInspector : " + e);
		}
		return responseDto;
	}

	@Override
	public ProcessResponseDto getAllOffences(ProcessRequestDto requestDto) {
		ProcessResponseDto responseDto = new ProcessResponseDto();
		try {
			List<Offence> offences = offenceRepo.findAll();
			responseDto.setOffences(offences);
			responseDto.setSuccess(true);
		}catch (Exception e) {
			responseDto.setSuccess(false);
			System.out.println("getAllOffences : " + e);
		}
		return responseDto;
	}

	@Override
	public ProcessResponseDto getAllInvalidTickets(ProcessRequestDto requestDto) {
		ProcessResponseDto responseDto = new ProcessResponseDto();
		try {
			List<InvalidTicket> invalidTickets = invalidTicketRepo.findAll();
			responseDto.setInvalidTickets(invalidTickets);
			responseDto.setSuccess(true);
		}catch (Exception e) {
			responseDto.setSuccess(false);
			System.out.println("getAllInvalidTickets : " + e);
		}
		return responseDto;
	}

	@Transactional
	public ProcessResponseDto getAllTrips(ProcessRequestDto requestDto) {
		ProcessResponseDto responseDto = new ProcessResponseDto();
		try {
			
			
			List<Trip> pending = tripRepo.findByIncome(0);
			
			if(pending != null && pending.size() > 0) {
				for(Trip trip : pending) {
					long tot = 0;
					for(PassengerTrip passengerTrip : trip.getPassengerTrips()) {
						tot = tot + passengerTrip.getPrice();
					}
					trip.setIncome(tot);
					tripRepo.save(trip);
				}
			}
			
			List<Trip> trips = tripRepo.findAll();
			
			responseDto.setTrips(trips);
			responseDto.setSuccess(true);
		}catch (Exception e) {
			responseDto.setSuccess(false);
			System.out.println("getAllInvalidTickets : " + e);
		}
		return responseDto;
	}

	@Override
	public ProcessResponseDto getPassengerCounts(ProcessRequestDto requestDto) {
		ProcessResponseDto responseDto = new ProcessResponseDto();
		try {
			responseDto.setForeignUsers(userRepo.findByRole(UserRole.FOREIGN_PASSENGER).size());
			responseDto.setLocalUsers(userRepo.findByRole(UserRole.LOCAL_PASSENGER).size());
			responseDto.setSuccess(true);
		}catch (Exception e) {
			responseDto.setSuccess(false);
			System.out.println("getAllBusDrivers : " + e);
		}
		return responseDto;
	}
	
}
