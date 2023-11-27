package sliit.csse.ticketing.backend.dao.domain;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

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
@Table(name = "offence", catalog = "eticketing")
public class Offence {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	private Integer id;
	
	private Date date;
	private String time;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "inspector_id")
	private AppUser inspector;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "bus_id")
	private Bus bus;
}
