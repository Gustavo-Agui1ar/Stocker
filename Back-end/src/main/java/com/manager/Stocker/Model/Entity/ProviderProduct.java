package com.manager.Stocker.Model.Entity;
import com.manager.Stocker.Model.Entity.PK_composite.ProviderProductId;
import jakarta.persistence.*;
import org.jetbrains.annotations.NotNull;

@Entity
@Table(name = "provider_product")
public class ProviderProduct {

    @EmbeddedId
    private ProviderProductId id;

    @ManyToOne
    @MapsId("providerId")
    @JoinColumn(name = "provider_id")
    private Provider provider;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    private Double price;
    private Integer quantity;

    public ProviderProduct() {}

    public ProviderProduct(@NotNull Provider provider,@NotNull Product product, Double price, Integer quantity) {
        this.id = new ProviderProductId(provider.getId(), product.getId());
        this.provider = provider;
        this.product = product;
        this.price = price;
        this.quantity = quantity;
    }

    // Getters e Setters
    public ProviderProductId getId() {
        return id;
    }

    public void setId(ProviderProductId id) {
        this.id = id;
    }

    public Provider getProvider() {
        return provider;
    }

    public void setProvider(Provider provider) {
        this.provider = provider;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
