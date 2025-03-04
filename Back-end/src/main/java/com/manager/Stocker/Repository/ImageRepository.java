package com.manager.Stocker.Repository;

import com.manager.Stocker.Model.Entity.Client;
import com.manager.Stocker.Model.Entity.ImageClient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<ImageClient, Integer> {
}
