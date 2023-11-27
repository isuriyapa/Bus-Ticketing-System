package sliit.csse.ticketing.backend.dao.domain;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "passenger_trip", catalog = "eticketing")
public class PassengerTrip {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	private Integer id;
	
	private String startPoint;
	private String endPoint;
	
	private long distance;
	private long price;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "passenger_id")
	private AppUser user;
}
