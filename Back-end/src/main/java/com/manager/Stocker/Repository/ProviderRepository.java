package com.manager.Stocker.Repository;

import com.manager.Stocker.Model.Entity.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProviderRepository extends JpaRepository<Provider, Integer> {
    Optional<Provider> findByEnterprise(String enterprise);

    @Query("SELECT p.enterprise FROM Provider AS p")
    List<String> findAllNames();
}
