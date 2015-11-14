package com.koszolko.rr;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Repository of blood pressure measurements (rr)
 */
@RepositoryRestResource(collectionResourceRel = "rr", path = "rr")
public interface RRRepository extends PagingAndSortingRepository<RR, Long> {
}
