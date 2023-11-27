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
import sliit.csse.ticketing.backend.enums.UserRole;

@Data
@Entity
@Table(name = "bus", catalog = "eticketing")
public class Bus {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	private Integer id;
	
	private String busNo;
	
	@OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "conductor_id")
	private AppUser conductor;
	
	@OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "driver_id")
	private AppUser driver;
	
	@OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "inspector_id")
	private AppUser inspector;
}
