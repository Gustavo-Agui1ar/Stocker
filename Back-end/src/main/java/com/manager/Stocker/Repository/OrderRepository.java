package com.manager.Stocker.Repository;

import com.manager.Stocker.Model.Dto.QueryResponse.ItemsDTO;
import com.manager.Stocker.Model.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query(""" 
        SELECT new com.manager.Stocker.Model.Dto.QueryResponse.ItemsDTO(
                o.orderName,
                o.id,
                o.product.category,
                o.quantity,
                o.date,
                o.price)
        FROM Order AS o
        WHERE o.client.id = :clientId
        """)
    List<ItemsDTO> findByID(@Param("clientId") int id);
}
