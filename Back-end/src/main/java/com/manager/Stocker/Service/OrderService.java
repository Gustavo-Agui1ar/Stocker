package com.manager.Stocker.Service;

import com.manager.Stocker.Model.Dto.OrderDto;
import com.manager.Stocker.Model.Entity.*;
import com.manager.Stocker.Repository.OrderRepository;
import com.manager.Stocker.Repository.ProductProviderRepository;
import com.manager.Stocker.Utils.ConvertMapToValue;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ClientService clientService;
    private final ProductService productService;
    private final ProviderService providerService;
    private final ProductProviderRepository ppRepository;

    public OrderService(ProductProviderRepository ppRepository, OrderRepository orderRepository, ClientService clientService, ProductService productService, ProviderService providerService) {
        this.orderRepository = orderRepository;
        this.ppRepository = ppRepository;
        this.clientService = clientService;
        this.productService = productService;
        this.providerService = providerService;
    }

    public ResponseEntity<?> addOrder(OrderDto dto) {
        Optional<Client>   client   = clientService.findByName(dto.client());
        Optional<Provider> provider = providerService.findByEnterprise(dto.provider());
        Optional<Product>  product  = productService.findByProductNameAndCategory(dto.product(), dto.category());

        if(client.isEmpty())
            return new ResponseEntity<>("Client not found", HttpStatus.NOT_FOUND);
        if(product.isEmpty())
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        if(provider.isEmpty())
            return new ResponseEntity<>("Provider not found", HttpStatus.NOT_FOUND);

        Optional<Double> price = ppRepository.findPriceByProductAndProvider(product.get().getId(), provider.get().getId());

        if(price.isEmpty())
            return new ResponseEntity<>("price not defined", HttpStatus.NOT_FOUND);

        Double totalPrice = price.get() * dto.qty();

        Order order = new Order(product.get(), client.get(), provider.get(), totalPrice, LocalDate.now());
        orderRepository.save(order);
        return null;
    }
}
