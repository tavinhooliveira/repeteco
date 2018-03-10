package com.repeteco.repetecows.api.handlers

import org.springframework.http.HttpStatus
import org.springframework.web.reactive.function.server.ServerResponse
import org.springframework.web.reactive.function.server.ServerResponse.status
import org.springframework.web.reactive.function.server.body
import reactor.core.publisher.Mono
import com.repeteco.repetecows.models.Error;

fun internalServerError(message: String) = error(HttpStatus.INTERNAL_SERVER_ERROR, message)
fun internalServerError(t: Throwable) = error(HttpStatus.INTERNAL_SERVER_ERROR, t)


private fun error(status: HttpStatus, message: String): Mono<ServerResponse> {
    val error = Error(status.value(), listOf(message))
    return status(status).body(Mono.just(error))
}

private fun error(status: HttpStatus, t: Throwable): Mono<ServerResponse> {
    val error = Error(status.value(), listOf(t.message ?: status.name))
    return status(status).body(Mono.just(error))
}