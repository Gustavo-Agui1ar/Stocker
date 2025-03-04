package com.manager.Stocker.Utils;

import org.springframework.context.annotation.Bean;

import java.util.Map;

public class ConvertMapToValue {

    public ConvertMapToValue() {}

    public String getStringFilter(String key, Map<String, Object> filter) {
        if(filter.containsKey(key) && filter.get(key) != "")
            return filter.get(key).toString();
        return null;
    }

    public Double getDoubleFilter(String key, Map<String, Object> filter) {
        if(filter.containsKey(key) && filter.get(key) != "")
            return Double.valueOf(filter.get(key).toString());
        return null;
    }

    public Integer getIntFilter(String key, Map<String, Object> filter) {
        if(filter.containsKey(key) && filter.get(key) != "")
            return Integer.valueOf(filter.get(key).toString());
        return null;
    }
}
