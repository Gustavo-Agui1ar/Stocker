package com.manager.Stocker.Model.Dto;

public record OrderDto(String product, String category, Integer qty, String provider, String client) {}
