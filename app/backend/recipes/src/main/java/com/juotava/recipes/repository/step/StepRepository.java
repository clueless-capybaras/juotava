package com.juotava.recipes.repository.step;

import com.juotava.recipes.model.Step;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class StepRepository {
    private final SpringStepRepository springStepRepository;

    @Autowired
    public StepRepository(SpringStepRepository springStepRepository) {
        this.springStepRepository = springStepRepository;
    }

    public Step findByUuid(UUID uuid){
        return this.springStepRepository.findById(uuid).get();
    }

    public List<Step> findAll(){
        return this.springStepRepository.findAll();
    }

    public void save(Step step){
        this.springStepRepository.save(step);
    }

}
