package com.repeteco.repetecows

import com.orientechnologies.orient.core.db.OPartitionedDatabasePool
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.social.config.annotation.ConnectionFactoryConfigurer
import org.springframework.social.facebook.connect.FacebookConnectionFactory

@Configuration
class Beans {

    @Bean
    fun oPartitionedDatabasePool(@Value("\${orient.local.url}") url: String,
                                 @Value("\${orient.username}") username: String,
                                 @Value("\${orient.password}") password: String): OPartitionedDatabasePool =
            OPartitionedDatabasePool(url, username, password)

    @Bean
    fun facebookConnectionFactory(@Value("\${spring.social.facebook.appId}") clientId: String,
                                  @Value("\${spring.social.facebook.appSecret}") clientSecret: String) =
            FacebookConnectionFactory(clientId, clientSecret)

}