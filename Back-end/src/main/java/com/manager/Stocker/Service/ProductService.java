package com.manager.Stocker.Service;

import com.manager.Stocker.Model.Dto.ProductDTO;
import com.manager.Stocker.Model.Dto.QueryResponse.ProductFilter;
import com.manager.Stocker.Model.Entity.Product;
import com.manager.Stocker.Model.Entity.Provider;
import com.manager.Stocker.Model.Entity.ProviderProduct;
import com.manager.Stocker.Repository.ProductProviderRepository;
import com.manager.Stocker.Repository.ProductRepository;
import com.manager.Stocker.Utils.ConvertMapToValue;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductProviderRepository ppRepository;
    private final ProviderService providerService;
    private final ConvertMapToValue convertMapToValue = new ConvertMapToValue();

    public ProductService(ProductRepository productRepository, ProviderService providerService, ProductProviderRepository ppRepository) {
        this.productRepository = productRepository;
        this.providerService = providerService;
        this.ppRepository = ppRepository;
    }

    public ResponseEntity<String> addProduct(ProductDTO dto) {

        if(dto.name().isEmpty() || dto.category().isEmpty() || dto.price() == 0)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid data");

        Optional<Provider> provider = providerService.getProviderByEnterprise(dto.provider());

        if(provider.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Provider not found");

        Optional<Product> product = productRepository.findByNameAndCategory(dto.name(),
                                                                dto.category());
        if(product.isEmpty()) {
            product = Optional.of(new Product(dto.name(), dto.category()));
            try {
                ProviderProduct pp = new ProviderProduct(provider.get(),
                                            productRepository.save(product.get()),
                                            dto.price(),
                                            dto.qty());
                ppRepository.save(pp);
                return ResponseEntity.status(HttpStatus.CREATED).body("Product created");
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
            }
        } else {
            ProviderProduct pp = new ProviderProduct(provider.get(), product.get(),
                                                     dto.price(), dto.qty());
            try {
                ppRepository.save(pp);
                return ResponseEntity.status(HttpStatus.CREATED).body("Product created");
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
            }
        }
    }

    public List<ProductFilter> findInRange(Map<String, Object> filter, int page, int sizePage) {
        page = Math.max(page, -1);

        String category = convertMapToValue.getStringFilter("category", filter);
        String name     = convertMapToValue.getStringFilter("name", filter);

        Integer id_product = convertMapToValue.getIntFilter("code", filter);

        String enterprise = convertMapToValue.getStringFilter("provider", filter);
        Double price      = convertMapToValue.getDoubleFilter("price", filter);
        Integer qty       = convertMapToValue.getIntFilter("qty", filter);
        filter.put("size", ppRepository.countLines(price, qty, enterprise, name, category, id_product));
        return ppRepository.findByFilter(price, qty, enterprise, name, category, id_product, PageRequest.of(page, sizePage));
    }

    public long count() {
        return productRepository.countLines();
    }

    @Transactional
    public void deleteAll(){
        try {
         productRepository.deleteAll();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public Optional<Product> findByProductNameAndCategory(String name, String category) {
        return productRepository.findByNameAndCategory(name, category);
    }
}
