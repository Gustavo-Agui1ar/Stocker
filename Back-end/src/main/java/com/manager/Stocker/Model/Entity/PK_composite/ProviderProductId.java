package com.manager.Stocker.Model.Entity.PK_composite;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ProviderProductId implements Serializable {

    private int providerId;
    private int productId;

    public ProviderProductId() {}

    public ProviderProductId(int providerId, int productId) {
        this.providerId = providerId;
        this.productId = productId;
    }

    // Getters e Setters
    public int getProviderId() {
        return providerId;
    }

    public void setProviderId(int providerId) {
        this.providerId = providerId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProviderProductId that = (ProviderProductId) o;
        return Objects.equals(providerId, that.providerId) &&
                Objects.equals(productId, that.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(providerId, productId);
    }
}
