package sliit.csse.ticketing.backend.dao.domain;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;
import sliit.csse.ticketing.backend.enums.ScheduleFrequency;

@Data
@Entity
@Table(name = "schedule", catalog = "eticketing")
public class Schedule {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	private Integer id;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "bus_id")
	private Bus bus;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "route_id")
	private Route route;
	private String depTime;
	private String arrTime;
	private ScheduleFrequency frequency;
}
