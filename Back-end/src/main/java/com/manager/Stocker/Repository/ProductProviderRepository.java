package com.manager.Stocker.Repository;

import com.manager.Stocker.Model.Dto.QueryResponse.ProductFilter;
import com.manager.Stocker.Model.Entity.PK_composite.ProviderProductId;
import com.manager.Stocker.Model.Entity.Product;
import com.manager.Stocker.Model.Entity.ProviderProduct;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductProviderRepository  extends JpaRepository<ProviderProduct, ProviderProductId> {

    @Query("""
        SELECT new com.manager.Stocker.Model.Dto.QueryResponse.ProductFilter(
            p.id, p.name, p.category, pp.price, pp.quantity, prov.enterprise
        )
        FROM ProviderProduct pp
        JOIN pp.product p
        JOIN pp.provider prov
        WHERE (:product_id IS NULL OR pp.product.id = :product_id)
        AND (:enterprise IS NULL OR  prov.enterprise LIKE CONCAT(:enterprise, '%'))
        AND (:qty IS NULL OR pp.quantity = :qty)
        AND (:name IS NULL OR p.name LIKE CONCAT(:name, '%'))
        AND (:category IS NULL OR p.category LIKE CONCAT(:category, '%'))
        AND (:price IS NULL OR pp.price = :price)
        ORDER BY p.id
    """)
    List<ProductFilter> findByFilter(@Param("price") Double price,
                                     @Param("qty") Integer qty,
                                     @Param("enterprise") String enterprise,
                                     @Param("name") String name,
                                     @Param("category") String category,
                                     @Param("product_id") Integer product_id,
                                     Pageable pageable);
    @Query("""
        SELECT count(*)
        FROM ProviderProduct pp
        JOIN pp.product p
        JOIN pp.provider prov
        WHERE (:product_id IS NULL OR pp.product.id = :product_id)
        AND (:enterprise IS NULL OR  prov.enterprise = :enterprise)
        AND (:qty IS NULL OR pp.quantity = :qty)
        AND (:name IS NULL OR p.name = :name)
        AND (:category IS NULL OR p.category = :category)
        AND (:price IS NULL OR pp.price = :price)
    """)
    Double countLines(@Param("price") Double price,
                                     @Param("qty") Integer qty,
                                     @Param("enterprise") String enterprise,
                                     @Param("name") String name,
                                     @Param("category") String category,
                                     @Param("product_id") Integer product_id);

    @Query("""
        SELECT pp
        FROM ProviderProduct pp
        WHERE pp.product.id = :product_id AND pp.provider.id = :provider_id
    """)
    Optional<ProviderProduct> findByProductAndProvider(@Param("product_id") int productId,
                                                   @Param("provider_id") int providerId);
}
