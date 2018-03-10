package com.repeteco.repetecows

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter


@SpringBootApplication
class RepetecoWsApplication

@EnableWebSecurity
@Configuration
@ComponentScan("com.repeteco.repetecows.api")
class SecurityJavaConfig: WebSecurityConfigurerAdapter() {

    @LocalServerPort var randomPort: Int = 0

    override fun configure(http: HttpSecurity) {
        http
                .csrf().disable()
                .exceptionHandling()
                .and()
                .authorizeRequests()
                .antMatchers("/auth/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .logout()
    }

    fun configureGlobal(@Autowired auth: AuthenticationManagerBuilder) {
        auth.inMemoryAuthentication()
                .withUser("user")
                .password("oi").roles("User")
    }
}

fun main(args: Array<String>) {
    runApplication<RepetecoWsApplication>(*args)
}
