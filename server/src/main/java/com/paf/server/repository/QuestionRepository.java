package com.paf.server.repository;

import com.paf.server.model.Questions;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuestionRepository  extends JpaRepository<Questions, Long> {
    @Query("SELECT DISTINCT q.subject FROM Questions q")
    List<String> findDistinctSubject();
    Page<Questions> findBySubject(String subject, Pageable pageable);
}
