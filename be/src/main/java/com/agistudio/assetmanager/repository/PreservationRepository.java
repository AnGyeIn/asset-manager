package com.agistudio.assetmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.agistudio.assetmanager.model.entity.Preservation;

@Repository
public interface PreservationRepository extends JpaRepository<Preservation, Integer> {

}
