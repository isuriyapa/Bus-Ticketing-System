package sliit.csse.ticketing.backend.dao.dto;

import java.util.List;

import lombok.Data;
import sliit.csse.ticketing.backend.dao.domain.AppUser;
import sliit.csse.ticketing.backend.dao.domain.Bus;
import sliit.csse.ticketing.backend.dao.domain.InvalidTicket;
import sliit.csse.ticketing.backend.dao.domain.Offence;
import sliit.csse.ticketing.backend.dao.domain.Route;
import sliit.csse.ticketing.backend.dao.domain.Schedule;
import sliit.csse.ticketing.backend.dao.domain.Trip;

@Data
public class ProcessResponseDto {
	private boolean isSuccess;
	private List<AppUser> users;
	private List<AppUser> drivers;
	private List<AppUser> conductors;
	private List<AppUser> inspectors;
	private List<Bus> busList;
	private List<Route> routes;
	private List<Schedule> schedules;
	private List<Offence> offences;
	private List<InvalidTicket> invalidTickets;
	private List<Trip> trips;
	private int foreignUsers;
	private int localUsers;

}
