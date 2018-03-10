package com.repeteco.repetecows.api

import com.orientechnologies.orient.core.db.OPartitionedDatabasePool
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Mono

@RestController
@RequestMapping("/auth")
class AuthController {

    @Autowired
    lateinit var pool: OPartitionedDatabasePool

    @GetMapping("/login")
    fun facebookLoginCallback(@RequestParam("code") code: String): Mono<String> {
        System.out.print("Pool" + pool.acquire().checkIfActive())
        return Mono.just(code)
    }

}