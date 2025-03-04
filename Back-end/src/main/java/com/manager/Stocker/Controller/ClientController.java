package com.manager.Stocker.Controller;

import com.manager.Stocker.Model.Dto.QueryResponse.ResponseSimpleClient;
import com.manager.Stocker.Model.Entity.Client;
import com.manager.Stocker.Model.Entity.ImageClient;
import com.manager.Stocker.Service.ClientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/client")
@CrossOrigin(origins = "*") //temporario apenas para testes
public class ClientController {

    ClientService clientService;

    public ClientController(ClientService clientService) {this.clientService = clientService;}

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> getClientsByFilter(@RequestParam Map<String, Object> request) {
        List<ResponseSimpleClient> list = clientService.findByFilterAndRange(request);
        Map<String, Object> map = Map.of("list", list, "sizeList", list.size(), "size", request.get("size"));
        return ResponseEntity.ok(map);
    }

    @GetMapping("/getByEmail")
    public ResponseEntity<Client> get(@RequestParam("email") String email) {
        return clientService.findByEmail(email);
    }

    @GetMapping("/getImage")
    public ResponseEntity<?> getImage(@RequestParam("email") String email) {
        return clientService.getImage(email);
    }

    @GetMapping("/All")
    public ResponseEntity<?> All() {
        return clientService.findAllName();
    }
}
