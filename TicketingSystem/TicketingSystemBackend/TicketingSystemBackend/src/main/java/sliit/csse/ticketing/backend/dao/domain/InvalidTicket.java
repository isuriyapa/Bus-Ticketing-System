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

@Data
@Entity
@Table(name = "invalid_ticket", catalog = "eticketing")
public class InvalidTicket {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	private Integer id;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "trip_id")
	private Trip trip;
	
	private Integer noOfTickets;
}
