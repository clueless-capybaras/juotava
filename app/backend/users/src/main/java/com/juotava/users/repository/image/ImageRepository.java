package com.juotava.users.repository.image;

import com.juotava.users.model.Image;
import com.juotava.users.model.Settings;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class ImageRepository {
    private SpringImageRepository springImageRepository;

    public ImageRepository(SpringImageRepository springImageRepository) {
        this.springImageRepository = springImageRepository;
    }

    public Image findById(UUID uuid){
        return this.springImageRepository.findById(uuid).get();
    }

    public List<Image> findAll(){
        return this.springImageRepository.findAll();
    }

    public void save(Image image){
        this.springImageRepository.save(image);
    }
}
