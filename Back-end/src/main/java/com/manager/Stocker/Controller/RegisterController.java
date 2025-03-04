package com.manager.Stocker.Controller;

import com.manager.Stocker.Model.Dto.ClientDTO;
import com.manager.Stocker.Model.Dto.OrderDto;
import com.manager.Stocker.Model.Dto.ProductDTO;
import com.manager.Stocker.Model.Dto.ProviderDTO;
import com.manager.Stocker.Service.ClientService;
import com.manager.Stocker.Service.OrderService;
import com.manager.Stocker.Service.ProductService;
import com.manager.Stocker.Service.ProviderService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/register")
@CrossOrigin(origins = "*") //temporario apenas para testes
public class RegisterController {

    private final ProductService productService;
    private final ProviderService providerService;
    private final ClientService clientService;
    private final OrderService orderService;

    public RegisterController(OrderService orderService, ProductService productService, ProviderService providerService, ClientService clientService) {
        this.productService = productService;
        this.providerService = providerService;
        this.clientService = clientService;
        this.orderService = orderService;
    }

    @PostMapping("/product")
    public ResponseEntity<String> registerProduct(@RequestBody ProductDTO dto) {
        return productService.addProduct(dto);
    }

    @PostMapping("/provider")
    public ResponseEntity<Void> registerProvider(@RequestBody ProviderDTO dto) {
        boolean isSaved = providerService.saveProvider(dto);
        return isSaved ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @PostMapping("/client")
    public ResponseEntity<Integer> registerClient(@RequestBody ClientDTO dto) {
        return clientService.addClient(dto);
    }

    @PostMapping(value = "/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Integer> registerClientImage(@RequestParam("file") MultipartFile file,
                                                      @RequestParam("id") Integer id) throws IOException {
        return clientService.addImage(file, id);
    }

    @PostMapping("/order")
    ResponseEntity<?> registerOrder(@RequestBody OrderDto dto) {
        return orderService.addOrder(dto);
    }

    @DeleteMapping("/deleteAll")
    public ResponseEntity<Void> deleteAll() {
        productService.deleteAll();
        return ResponseEntity.ok().build();
    }

}
