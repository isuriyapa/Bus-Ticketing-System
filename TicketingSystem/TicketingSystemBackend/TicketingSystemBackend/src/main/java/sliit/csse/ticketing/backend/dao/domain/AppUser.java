package sliit.csse.ticketing.backend.dao.domain;

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

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.CascadeType;

@Data
@Entity
@Table(name = "app_user", catalog = "eticketing")
public class AppUser {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	private Integer id;
	private String username;
	private UserRole role;
	private String password;
	private String name;
	private String email;
	private String mobileNo;
	private String nic;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "token_id")
    private PassengerToken passengerToken;
		
}
