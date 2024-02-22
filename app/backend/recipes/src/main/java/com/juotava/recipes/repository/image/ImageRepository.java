package com.juotava.recipes.repository.image;

import com.juotava.recipes.model.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public class ImageRepository {
    private final SpringImageRepository springImageRepository;

    @Autowired
    public ImageRepository(SpringImageRepository springImageRepository) {
        this.springImageRepository = springImageRepository;
    }

    public Image findByUuid(UUID uuid){
        return this.springImageRepository.findById(uuid).get();
    }

    public List<Image> findAll(){
        return this.springImageRepository.findAll();
    }

    public void save(Image image){
        this.springImageRepository.save(image);
    }

}
