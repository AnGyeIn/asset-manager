package com.agistudio.assetmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.agistudio.assetmanager.model.entity.RepeatedAccountBookEntry;

@Repository
public interface RepeatedAccountBookEntryRepository extends JpaRepository<RepeatedAccountBookEntry, Integer> {

}
