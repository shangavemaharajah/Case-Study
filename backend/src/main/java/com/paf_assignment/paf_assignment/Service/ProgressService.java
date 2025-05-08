package com.paf_assignment.paf_assignment.Service;

import com.paf_assignment.paf_assignment.DTO.ProgressDTO;
import com.paf_assignment.paf_assignment.Model.Progress;

import java.util.List;
import java.util.Optional;

public interface ProgressService {
    List<Progress> getProgress();
    Optional<Progress> getProgressById(String id);
    Progress addProgress(ProgressDTO progressDTO); // Should accept ProgressDTO
    void deleteProgress(String id);
    Progress updateProgress(String id, ProgressDTO progressDTO); // Should accept ProgressDTO
}
