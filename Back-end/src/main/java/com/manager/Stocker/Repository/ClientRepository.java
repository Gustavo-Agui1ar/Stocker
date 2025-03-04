package com.manager.Stocker.Repository;

import com.manager.Stocker.Model.Dto.QueryResponse.ResponseSimpleClient;
import com.manager.Stocker.Model.Entity.Client;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Integer> {

    Optional<Client> findByEmailOrCnpj(String email, String cnpj);
    @Query("""
        Select new com.manager.Stocker.Model.Dto.QueryResponse.ResponseSimpleClient(
                c.name, c.email, c.cnpj, c.store
                )
        FROM Client AS c
        WHERE (:name  is null or c.name  like :name)
        AND   (:email is null or c.email like :email)
        AND   (:cnpj  is null or c.cnpj   like :cnpj)
        AND   (:store is null or c.store like :store)
        """)
    List<ResponseSimpleClient> findByFilter(@Param("name") String name,
                                            @Param("email")String email,
                                            @Param("cnpj") String cnpj,
                                            @Param("store") String store,
                                            Pageable pageable);
    @Query("""
        Select count(*)
        FROM Client AS c
        WHERE (:name  is null or c.name  like :name)
        AND   (:email is null or c.email like :email)
        AND   (:cnpj  is null or c.cnpj   like :cnpj)
        AND   (:store is null or c.store like :store)
        """)
    Double countLines(@Param("name") String name,
                                            @Param("email")String email,
                                            @Param("cnpj") String cnpj,
                                            @Param("store") String store);

    Optional<Client> findByEmail(String email);
    Optional<Client> findByName(String name);

    @Query("SELECT c.name FROM Client AS c")
    List<String> findAllNames();

}
