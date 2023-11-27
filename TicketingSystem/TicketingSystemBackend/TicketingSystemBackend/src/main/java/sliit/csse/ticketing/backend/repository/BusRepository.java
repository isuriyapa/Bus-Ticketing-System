package sliit.csse.ticketing.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sliit.csse.ticketing.backend.dao.domain.Bus;
@Repository
public interface BusRepository extends JpaRepository<Bus, Integer>{

}
