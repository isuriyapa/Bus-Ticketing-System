package sliit.csse.ticketing.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;

import sliit.csse.ticketing.backend.dao.domain.AppUser;
import sliit.csse.ticketing.backend.dao.domain.Bus;
import sliit.csse.ticketing.backend.dao.dto.ProcessRequestDto;
import sliit.csse.ticketing.backend.dao.dto.ProcessResponseDto;
import sliit.csse.ticketing.backend.enums.UserRole;
import sliit.csse.ticketing.backend.repository.JwtUserRepository;
import sliit.csse.ticketing.backend.repository.RouteRepository;
import sliit.csse.ticketing.backend.service.i.TicketingSystemBackendService;

@SpringBootTest
public class TicketingApplicationTests {
	@Autowired TicketingSystemBackendService backendService;
	
	 @MockBean RouteRepository routeRepo;
	 @Autowired JwtUserRepository userRepo;
	 
	//IT21214134	
   // Positive Test Cases
    
    @Test
    void testGetAllUsers() {
        ProcessRequestDto requestDto = new ProcessRequestDto();
        ProcessResponseDto responseDto = backendService.getAllUsers(requestDto);
        assertTrue(responseDto.isSuccess());
        assertNotNull(responseDto.getUsers());
    }

    @Test
    void testUpdateUser() {
        ProcessRequestDto requestDto = new ProcessRequestDto();

        List<AppUser> appUsers = userRepo.findAll();
        AppUser appUser = appUsers.get(0);       
        appUser.setEmail("test@gmail.com");
        
        requestDto.setUser(appUser);
        
        ProcessResponseDto responseDto = backendService.updateUser(requestDto);
        assertTrue(responseDto.isSuccess());
    }

    @Test
    void testDeleteUser() {
        ProcessRequestDto requestDto = new ProcessRequestDto();
        
        List<AppUser> admins = userRepo.findByRole(UserRole.ADMIN);
        AppUser appUser = admins.get(0);
        requestDto.setUser(appUser);
        
        ProcessResponseDto responseDto = backendService.deleteUser(requestDto);
        assertTrue(responseDto.isSuccess());
    }
    
    // Negative Test Cases
    
    @Test
    void testUpdateUserWithNullUser() {
        ProcessRequestDto requestDto = new ProcessRequestDto();
        ProcessResponseDto responseDto = backendService.updateUser(requestDto);
        assertFalse(responseDto.isSuccess());
    }

    @Test
    void testDeleteUserWithNullUser() {
        ProcessRequestDto requestDto = new ProcessRequestDto();
        ProcessResponseDto responseDto = backendService.deleteUser(requestDto);
        assertFalse(responseDto.isSuccess());
    }
    
    //IT21212604
    //Positive test cases

//    @Test
//    void testGetAllBusDrivers() {
//        ProcessRequestDto requestDto = new ProcessRequestDto();
//        ProcessResponseDto responseDto = backendService.getAllBusDrivers(requestDto);
//        assertTrue(responseDto.isSuccess());
//        assertNotNull(responseDto.getDrivers());
//    }
//
//    @Test
//    void testAddBus() {
//        ProcessRequestDto requestDto = new ProcessRequestDto();
//        
//        Bus bus = new Bus();
//        bus.setBusNo("001");
//        
//        List<AppUser> conductors = userRepo.findByRole(UserRole.CONDUCTOR);
//        bus.setConductor(conductors.get(0));
//        
//        List<AppUser> drivers = userRepo.findByRole(UserRole.DRIVER);
//        bus.setDriver(drivers.get(0));
//        
//        requestDto.setBus(bus);
//        ProcessResponseDto responseDto = backendService.addBus(requestDto);
//        assertTrue(responseDto.isSuccess());
//    }
//
//    @Test
//    void testGetAllBuses() {
//        ProcessRequestDto requestDto = new ProcessRequestDto();
//        ProcessResponseDto responseDto = backendService.getAllBuses(requestDto);
//        assertTrue(responseDto.isSuccess());
//        assertNotNull(responseDto.getBusList());
//    }
//
//   
//    //Negative test cases
//    
//
//    @Test
//    void testAddBusWithNullBus() {
//        ProcessRequestDto requestDto = new ProcessRequestDto();
//        ProcessResponseDto responseDto = backendService.addBus(requestDto);
//        assertFalse(responseDto.isSuccess());
//    }
//
//    @Test
//    void testGetAllRoutesWithException() {
//        when(routeRepo.findAll()).thenThrow(new RuntimeException("Database connection error"));
//
//        ProcessRequestDto requestDto = new ProcessRequestDto();
//        ProcessResponseDto responseDto = backendService.getAllBusRoutes(requestDto);
//
//        assertNotNull(responseDto.isSuccess());
//        assertFalse(responseDto.isSuccess());
//    }
    
    
    
}
