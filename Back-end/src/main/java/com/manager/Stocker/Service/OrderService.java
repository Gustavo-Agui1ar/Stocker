package com.manager.Stocker.Service;

import com.manager.Stocker.Model.Dto.OrderDTO;
import com.manager.Stocker.Model.Dto.QueryResponse.ItemsDTO;
import com.manager.Stocker.Model.Entity.*;
import com.manager.Stocker.Repository.ClientRepository;
import com.manager.Stocker.Repository.OrderRepository;
import com.manager.Stocker.Repository.ProductProviderRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ClientService clientService;
    private final ProductService productService;
    private final ProviderService providerService;
    private final ProductProviderRepository ppRepository;
    private final ClientRepository clientRepository;

    public OrderService(ProductProviderRepository ppRepository, OrderRepository orderRepository, ClientService clientService, ProductService productService, ProviderService providerService, ClientRepository clientRepository) {
        this.orderRepository = orderRepository;
        this.ppRepository = ppRepository;
        this.clientService = clientService;
        this.productService = productService;
        this.providerService = providerService;
        this.clientRepository = clientRepository;
    }

    public ResponseEntity<?> addOrder(OrderDTO dto) {
        Optional<Client>   client   = clientService.findByName(dto.client());
        Optional<Provider> provider = providerService.findByEnterprise(dto.provider());
        Optional<Product>  product  = productService.findByProductNameAndCategory(dto.product(), dto.category());

        if(client.isEmpty())
            return new ResponseEntity<>("Cliente inválido", HttpStatus.NOT_FOUND);
        if(product.isEmpty())
            return new ResponseEntity<>("Produto inválido", HttpStatus.NOT_FOUND);
        if(provider.isEmpty())
            return new ResponseEntity<>("Fornecedor inválido", HttpStatus.NOT_FOUND);

        Optional<ProviderProduct> pp = ppRepository.findByProductAndProvider(product.get().getId(), provider.get().getId());

        if (dto.qty() == null)
            return new ResponseEntity<>("Quantidade não definida", HttpStatus.NOT_FOUND);

        if(dto.name() == null)
            return new ResponseEntity<>("nome do pedido não definida", HttpStatus.NOT_FOUND);

        if(pp.isEmpty())
            return new ResponseEntity<>("Este Fornecedor não fornece este produto", HttpStatus.NOT_FOUND);

        if(pp.get().getPrice() == null)
            return new ResponseEntity<>("Preço não definido para este produto", HttpStatus.NOT_FOUND);

        Double totalPrice = pp.get().getPrice() * dto.qty();

        Order order = new Order(product.get(), client.get(), dto.name(), provider.get(), totalPrice, dto.qty(), LocalDate.now());
        orderRepository.save(order);
        return new ResponseEntity<>("Produto criado com sucesso", HttpStatus.CREATED);
    }

    public ResponseEntity<?> getItemsByClient(String email) {
        Optional<Client> client = clientRepository.findByEmail(email);
        if(client.isEmpty())
            return new ResponseEntity<>("Client not found", HttpStatus.NOT_FOUND);
        List<ItemsDTO> list = orderRepository.findByID(client.get().getId());
        if(list.isEmpty())
            return new ResponseEntity<>("Client not found", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
