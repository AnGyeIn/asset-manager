package com.agistudio.assetmanager.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.agistudio.assetmanager.model.entity.RepeatedAccountBookEntry;

@Repository
public interface RepeatedAccountBookEntryRepository extends JpaRepository<RepeatedAccountBookEntry, Integer> {

  @Query(value = "SELECT DISTINCT(title)"
              + " FROM repeated_account_book_entry"
              + " WHERE title IS NOT NULL",
         nativeQuery = true)
  public Set<String> findAllTitles();

  @Query(value = "SELECT DISTINCT(description)"
              + " FROM repeated_account_book_entry"
              + " WHERE description IS NOT NULL",
         nativeQuery = true)
  public Set<String> findAllDescriptions();
}
