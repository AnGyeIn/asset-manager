package com.agistudio.assetmanager.repository;

import java.util.List;

import javax.persistence.Tuple;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.agistudio.assetmanager.model.entity.AccountBookEntry;

@Repository
public interface AccountBookEntryRepository extends JpaRepository<AccountBookEntry, Integer> {
  
  @Query(value = "SELECT DISTINCT year"
              + "                ,month"
              + " FROM account_book_entry"
              + " GROUP BY year"
              + "         ,month",
         nativeQuery = true)
  List<Tuple> findAllYearAndMonth();
}
