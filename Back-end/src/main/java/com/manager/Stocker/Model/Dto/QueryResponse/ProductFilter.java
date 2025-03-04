package com.manager.Stocker.Model.Dto.QueryResponse;

public record ProductFilter(Integer code, String name, String category, Double price, Integer qty, String provider) {}