package com.manager.Stocker.Repository;

import com.manager.Stocker.Model.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
}
