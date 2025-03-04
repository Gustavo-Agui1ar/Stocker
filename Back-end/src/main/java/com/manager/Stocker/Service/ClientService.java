package com.manager.Stocker.Service;

import com.manager.Stocker.Model.Dto.ClientDTO;
import com.manager.Stocker.Model.Dto.QueryResponse.ImageResponse;
import com.manager.Stocker.Model.Dto.QueryResponse.ResponseSimpleClient;
import com.manager.Stocker.Model.Entity.Client;
import com.manager.Stocker.Model.Entity.ImageClient;
import com.manager.Stocker.Repository.ClientRepository;
import com.manager.Stocker.Repository.ImageRepository;
import com.manager.Stocker.Utils.ConvertMapToValue;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final ImageRepository imageRepository;
    private ConvertMapToValue convertMapToValue = new ConvertMapToValue();

    public ClientService(ClientRepository clientRepository, ImageRepository imageRepository) {
        this.clientRepository = clientRepository;
        this.imageRepository = imageRepository;
    }

    public ResponseEntity<Integer> addClient(ClientDTO dto) {
        Optional<Client> op = clientRepository.findByEmailOrCnpj(dto.email(), dto.Cnpj());

        if (op.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body((Integer) null);
        }

        if(dto.name() == null || dto.Cnpj() == null || dto.email() == null ||
            dto.address() == null || dto.phone() ==null || dto.store() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body((Integer) null);
        }

        if(dto.name().isEmpty() || dto.Cnpj().isEmpty() || dto.email().isEmpty()
        || dto.address().isEmpty() || dto.phone().isEmpty() || dto.store().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body((Integer) null);
        }

        Client client;
        client = new Client(
                dto.name(),
                dto.email(),
                dto.phone(),
                dto.address(),
                dto.Cnpj(),
                dto.store()
        );

        try {
            Client newClient = clientRepository.save(client);
            return ResponseEntity.status(HttpStatus.CREATED).body(newClient.getId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body((Integer) null);
        }
    }

    public ResponseEntity<Integer> addImage(MultipartFile file, Integer clientId) throws IOException {
        Client client = clientRepository.findById(clientId).orElse(null);
        if(client == null || file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(HttpStatus.BAD_REQUEST.value());
        }

        try{
           ImageClient img = new ImageClient(client, file.getOriginalFilename(), file.getBytes());
           img.compressImage();
           imageRepository.save(img);
           return ResponseEntity.status(HttpStatus.CREATED).body(HttpStatus.CREATED.value());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }

    public List<ResponseSimpleClient> findByFilterAndRange(Map<String, Object> filter) {
        Integer start = convertMapToValue.getIntFilter("page", filter);
        Integer end   = convertMapToValue.getIntFilter("sizePage", filter);

        start = Math.max(start, 0);
        end = (int) Math.min(end, clientRepository.count());

        String name  = convertMapToValue.getStringFilter("name", filter);
        String email = convertMapToValue.getStringFilter("email", filter);
        String Cnpj  = convertMapToValue.getStringFilter("Cnpj", filter);
        String store = convertMapToValue.getStringFilter("store", filter);
        filter.put("size", clientRepository.countLines(name,email, Cnpj, store));
        return clientRepository.findByFilter(name,
                                             email,
                                             Cnpj,
                                             store,
                                             PageRequest.of(start,end));

    }

    public ResponseEntity<Client> findByEmail(String email) {
        Optional<Client> client = clientRepository.findByEmail(email);

        return client.map(value -> ResponseEntity.status(HttpStatus.OK).body(value)).orElseGet(()
                -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    public ResponseEntity<?> getImage(String email) {
        if(email == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        Optional<Client> client = clientRepository.findByEmail(email);

        if(client.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

        Optional<ImageClient> img = imageRepository.findById(client.get().getId());

        if(img.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

        img.get().decompressImage();
        String base64Image = Base64.getEncoder().encodeToString(img.get().getImage());

        return ResponseEntity.status(HttpStatus.OK).body(new ImageResponse(img.get().getName(), base64Image));
    }

    public Optional<Client> findByName(String name) {
        return clientRepository.findByName(name);
    }

    public ResponseEntity<?> findAllName() {
        List<String> list = clientRepository.findAllNames();
        if (list.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }
}
