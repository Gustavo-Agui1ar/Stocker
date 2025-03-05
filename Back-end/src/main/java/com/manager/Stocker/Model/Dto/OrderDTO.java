package com.manager.Stocker.Model.Dto;

public record OrderDTO(String product, String orderName,String category, Integer qty, String provider, String client) {}
