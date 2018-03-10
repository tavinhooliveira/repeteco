package com.repeteco.repetecows.api

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
@RequestMapping("/repeteco/{userId}")
class UserController {

    @GetMapping
    fun perfil(@PathVariable userId: String) = Mono.just(userId)

    @GetMapping("/friends")
    fun friends(@PathVariable userId: String) = Mono.just(listOf<String>("oi", "tu"))
}