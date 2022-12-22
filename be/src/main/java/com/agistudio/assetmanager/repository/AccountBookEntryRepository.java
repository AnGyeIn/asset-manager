package com.agistudio.assetmanager.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.persistence.Tuple;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.agistudio.assetmanager.model.entity.AccountBookEntry;

@Repository
public interface AccountBookEntryRepository extends JpaRepository<AccountBookEntry, Integer> {
  
  public Boolean existsByYearAndMonth(Integer year, Integer month);

  @Query(value = "SELECT DISTINCT year"
              + "                ,month"
              + " FROM account_book_entry"
              + " GROUP BY year"
              + "         ,month"
              + " ORDER BY year"
              + "         ,month",
         nativeQuery = true)
  public List<Tuple> findAllYearAndMonth();

  public List<AccountBookEntry> findAllByYearAndMonthOrderByDateAscAccountBookEntryIdAsc(Integer year, Integer month);

  @Query(value = "SELECT DISTINCT year"
              + "                ,month"
              + " FROM account_book_entry"
              + " WHERE year > :currYear"
              + " OR (year = :currYear"
              + "     AND month > :currMonth)"
              + " GROUP BY year"
              + "         ,month"
              + " ORDER BY year"
              + "         ,month",
         nativeQuery = true)
  public List<Tuple> findAllYearAndMonthAfter(@Param(value = "currYear") Integer currYear, @Param(value = "currMonth") Integer currMonth);

  @Query(value = "SELECT IFNULL(SUM(amount), 0)"
              + " FROM account_book_entry"
              + " WHERE year = :year"
              + " AND month = :month",
         nativeQuery = true)
  public Integer getSumAmountByYearAndMonth(@Param(value = "year") Integer year, @Param(value = "month") Integer month);

  public Optional<AccountBookEntry> findFirstByYearAndMonthOrderByAccountBookEntryId(Integer year, Integer month);

  @Query(value = "SELECT DISTINCT(title)"
              + " FROM account_book_entry"
              + " WHERE title IS NOT NULL",
         nativeQuery = true)
  public Set<String> findAllTitle();

  @Query(value = "SELECT DISTINCT(description)"
              + " FROM account_book_entry"
              + " WHERE description IS NOT NULL",
         nativeQuery = true)
  public Set<String> findAllDescription();
}
