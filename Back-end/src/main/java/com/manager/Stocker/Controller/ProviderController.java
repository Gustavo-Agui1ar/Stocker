package com.manager.Stocker.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.manager.Stocker.Model.Entity.Product;
import com.manager.Stocker.Model.Entity.Provider;
import com.manager.Stocker.Service.ProductService;
import com.manager.Stocker.Service.ProviderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/provider")
@CrossOrigin(origins = "*") //temporario apenas para testes
public class ProviderController {

    private final ProviderService providerService;

    public ProviderController(ProviderService providerService) {this.providerService = providerService;}

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> search() {
        List<Provider> list = providerService.getAllProviders();
        Map<String, Object> response = Map.of("products", list, "size", list.size());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/All")
    public ResponseEntity<?> All() {
        return providerService.findAllEnterprise();
    }
}
