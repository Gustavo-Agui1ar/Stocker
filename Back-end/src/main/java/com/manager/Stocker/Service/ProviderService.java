package com.manager.Stocker.Service;

import com.manager.Stocker.Model.Dto.ProviderDTO;
import com.manager.Stocker.Model.Entity.Product;
import com.manager.Stocker.Model.Entity.Provider;
import com.manager.Stocker.Repository.ProviderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProviderService {

    private final ProviderRepository providerRepository;

    public ProviderService(ProviderRepository providerRepository) {this.providerRepository = providerRepository;}

    public boolean saveProvider(ProviderDTO dto) {

        if(dto.cnpj() == null || dto.address() == null ||
           dto.email() == null || dto.phone() == null  ||
           dto.enterprise() == null) return false;

        if(providerRepository.findByEnterprise(dto.enterprise()).isPresent())
            return false;

        Provider provider = new Provider(dto.enterprise(),
                                         dto.email(),
                                         dto.phone(),
                                         dto.email(),
                                         dto.cnpj());
        try {
            providerRepository.save(provider);
            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    public List<Provider> getAllProviders() {
        return providerRepository.findAll();
    }

    public Optional<Provider> getProviderByEnterprise(String enterprise) {
        return providerRepository.findByEnterprise(enterprise);
    }

    public Optional<Provider> findByEnterprise(String enterprise) {
        return providerRepository.findByEnterprise(enterprise);
    }

    public ResponseEntity<?> findAllEnterprise() {

        List<String> list = providerRepository.findAllNames();
        if(list.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(list);
    }
}
