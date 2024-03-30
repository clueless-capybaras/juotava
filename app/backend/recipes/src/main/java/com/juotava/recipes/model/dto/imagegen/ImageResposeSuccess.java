package com.juotava.recipes.model.dto.imagegen;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ImageResposeSuccess {
    private int created;
    private List<Data> data;
}
