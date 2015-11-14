package com.koszolko;

import com.koszolko.rr.RR;
import com.koszolko.rr.RRRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;

@SpringBootApplication
public class RRApplication implements CommandLineRunner {

    @Autowired
    private RRRepository repository;

    public static void main(String[] args) {
        SpringApplication.run(RRApplication.class, args);
    }

    @Override
    public void run(String... strings) throws Exception {
        repository.deleteAll();

        repository.save(
                RR.builder()
                        .hr(60)
                        .systolic(125)
                        .diastolic(80)
                        .date(LocalDate.of(2015, 10, 5))
                        .build()
        );
        repository.save(
                RR.builder()
                        .hr(65)
                        .systolic(132)
                        .diastolic(89)
                        .date(LocalDate.of(2015, 10, 6))
                        .build()
        );
        repository.save(
                RR.builder()
                        .hr(75)
                        .systolic(129)
                        .diastolic(78)
                        .date(LocalDate.of(2015, 10, 7))
                        .build()
        );
    }
}
