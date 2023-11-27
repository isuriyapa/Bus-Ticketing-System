package sliit.csse.ticketing.backend.dao.dto;

import lombok.Data;
import sliit.csse.ticketing.backend.enums.UserRole;

@Data
public class AppUserDto {
	private Integer id;
	private String username;
	private UserRole role;
	private String password;
	private String name;
	private String email;
	private String mobileNo;
	private String nic;

}
