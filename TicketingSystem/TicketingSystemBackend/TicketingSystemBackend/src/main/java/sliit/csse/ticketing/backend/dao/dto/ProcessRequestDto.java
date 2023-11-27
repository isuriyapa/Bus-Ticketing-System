package sliit.csse.ticketing.backend.dao.dto;

import lombok.Data;
import sliit.csse.ticketing.backend.dao.domain.AppUser;
import sliit.csse.ticketing.backend.dao.domain.Bus;
import sliit.csse.ticketing.backend.dao.domain.Route;
import sliit.csse.ticketing.backend.dao.domain.Schedule;

@Data
public class ProcessRequestDto {
	
	private AppUser user;
	private Bus bus;
	private Route route;
	private Schedule schedule;

}

