package com.manager.Stocker.Controller;

import com.manager.Stocker.Model.Dto.QueryResponse.ProductFilter;
import com.manager.Stocker.Service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*") //temporario ap enas para testes
public class ProductsController {

    private final ProductService productService;

    public ProductsController(ProductService productService) {this.productService = productService;}

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> search(@RequestParam Map<String, Object> request) {
        List<ProductFilter> list = productService.findInRange(request,
                                                        Integer.parseInt(request.get("Page").toString()),
                                                        Integer.parseInt(request.get("SizePage").toString()));
        if (list == null || list.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        Map<String, Object> response = Map.of("products", list, "size", request.get("size"), "sizeList", list.size());
        return ResponseEntity.ok(response);
    }


}
