package sliit.csse.ticketing.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sliit.csse.ticketing.backend.dao.domain.AppUser;
import sliit.csse.ticketing.backend.enums.UserRole;



public interface JwtUserRepository extends JpaRepository<sliit.csse.ticketing.backend.dao.domain.AppUser, Integer>{
	public AppUser findByUsername(String username);
	public List<AppUser> findByRole(UserRole role);

}
