package com.koszolko.rr;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

/**
 * Domain object. Single blood pressure measurement.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RR {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private int systolic;
    private int diastolic;
    private int hr;
    private LocalDate date;
}
