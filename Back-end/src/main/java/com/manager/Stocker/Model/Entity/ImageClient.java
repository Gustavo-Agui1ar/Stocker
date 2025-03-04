package com.manager.Stocker.Model.Entity;

import jakarta.persistence.*;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.DeflaterOutputStream;
import java.util.zip.InflaterInputStream;

@Entity
public class ImageClient {

    @Id
    private int id;

    @OneToOne(cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Client client;

    private String name;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] image;

    public ImageClient() {
    }

    public ImageClient(Client client, String name, byte[] image) {
        this.id = client.getId();
        this.client = client;
        this.name = name;
        this.image = image;
    }

    public void compressImage() {
        try (ByteArrayOutputStream bos = new ByteArrayOutputStream();
             DeflaterOutputStream dos = new DeflaterOutputStream(bos)) {
            dos.write(image);
            dos.close();
            image = bos.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Error compressing image", e);
        }
    }

    public void decompressImage() {
        try (ByteArrayInputStream bis = new ByteArrayInputStream(image);
             InflaterInputStream iis = new InflaterInputStream(bis);
             ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[1024];
            int len;
            while ((len = iis.read(buffer)) != -1) {
                bos.write(buffer, 0, len);
            }
            image = bos.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Error decompressing image", e);
        }
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
