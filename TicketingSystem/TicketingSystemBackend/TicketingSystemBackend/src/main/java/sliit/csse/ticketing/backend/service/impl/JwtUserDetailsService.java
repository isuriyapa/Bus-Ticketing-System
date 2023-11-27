package sliit.csse.ticketing.backend.service.impl;

import java.util.ArrayList;
import java.util.Random;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import sliit.csse.ticketing.backend.dao.domain.AppUser;
import sliit.csse.ticketing.backend.dao.domain.PassengerToken;
import sliit.csse.ticketing.backend.dao.dto.AppUserDto;
import sliit.csse.ticketing.backend.enums.UserRole;
import sliit.csse.ticketing.backend.repository.JwtUserRepository;
import sliit.csse.ticketing.backend.repository.PassengerTokenRepository;


@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private JwtUserRepository jwtUserRepository;
	
	@Autowired PassengerTokenRepository passengerTokenRepo;

	@Autowired
	private PasswordEncoder bcryptEncoder;
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		AppUser user = jwtUserRepository.findByUsername(username);
		
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				new ArrayList<>());
	}

	@Transactional
	public AppUser save(AppUserDto user) {
		AppUser newUser = new AppUser();
		
		if (user == null) {
			throw new UsernameNotFoundException("User cannot be null");
		}
		if(user.getRole() == UserRole.LOCAL_PASSENGER || user.getRole() == UserRole.FOREIGN_PASSENGER) {
			PassengerToken passengerToken = new PassengerToken();
			passengerToken.setBalance(0);
			passengerToken.setToken(tokenGenerator());
			newUser.setPassengerToken(passengerTokenRepo.save(passengerToken));
			
		}
		
		newUser.setUsername(user.getUsername());
		newUser.setRole(user.getRole());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		newUser.setEmail(user.getEmail());
		newUser.setMobileNo(user.getMobileNo());
		newUser.setName(user.getName());
		newUser.setNic(user.getNic());
		
		
		AppUser savedUser = jwtUserRepository.save(newUser);

		
		return  savedUser;
	}
	
	public int tokenGenerator() {
		Random random = new Random();
        int lowerBound = 100000;
        int upperBound = 1000000;
        int randomInt = random.nextInt(upperBound - lowerBound) + lowerBound;
        
        return randomInt;
	}
	
	public AppUserDto findUserByUsername(String username) {
		AppUser user = jwtUserRepository.findByUsername(username);
		
		AppUserDto userDto = new AppUserDto();
		userDto.setId(user.getId());
		userDto.setUsername(user.getUsername());
		userDto.setRole(user.getRole());
		userDto.setName(user.getName());
		userDto.setEmail(user.getEmail());
		userDto.setMobileNo(user.getMobileNo());
//		userDto.setPassword(user.getPassword());

		return userDto;
		
	}
}