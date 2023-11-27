package sliit.csse.ticketing.backend.dao.domain;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "trip", catalog = "eticketing")
public class Trip {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	private Integer id;
	
	private Date date;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "route_id")
	private Route route;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "bus_id")
	private Bus bus;
	private long income;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
	@JoinColumn(name = "trip_id")
	private List<PassengerTrip> passengerTrips;
}
