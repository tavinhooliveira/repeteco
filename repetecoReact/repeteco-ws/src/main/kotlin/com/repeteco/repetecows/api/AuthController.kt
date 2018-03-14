package com.repeteco.repetecows.api

import com.orientechnologies.orient.core.db.OPartitionedDatabasePool
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.social.connect.UserProfile
import org.springframework.social.facebook.api.User
import org.springframework.social.facebook.connect.FacebookConnectionFactory
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
@RequestMapping("/auth")
class AuthController(@Autowired val connectionFactory: FacebookConnectionFactory) {

    @Autowired
    lateinit var pool: OPartitionedDatabasePool

    @GetMapping("/login")
    fun facebookLoginCallback(@RequestParam("code") code: String): Mono<User> {
        val oAuth = connectionFactory.oAuthOperations
        val accessToken = oAuth.exchangeForAccess(code, "http://localhost:8080/auth/login", null)
        val facebook = connectionFactory.createConnection(accessToken)
        return Mono.just(facebook.api.fetchObject("me", User::class.java, "id", "email",  "first_name", "last_name"))
    }

}