package sliit.csse.ticketing.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sliit.csse.ticketing.backend.dao.domain.Trip;

@Repository
public interface TripRepository extends JpaRepository<Trip, Integer>{
	public List<Trip> findByIncome(long income);
}
