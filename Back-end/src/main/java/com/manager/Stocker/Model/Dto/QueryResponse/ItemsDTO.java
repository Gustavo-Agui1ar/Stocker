package com.manager.Stocker.Model.Dto.QueryResponse;

import java.time.LocalDate;

public record ItemsDTO(String name, Integer cod, String cat, Integer qty, LocalDate date, Double price) {}
