package sliit.csse.ticketing.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sliit.csse.ticketing.backend.dao.domain.Route;
import sliit.csse.ticketing.backend.dao.domain.Schedule;
@Repository
public interface RouteRepository extends JpaRepository<Route, Integer>{

}
