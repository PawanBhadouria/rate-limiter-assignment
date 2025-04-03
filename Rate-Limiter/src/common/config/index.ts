const CONFIGURATION = {
    APP_PUBLIC_KEY_PATH:  'src/common/config/application-keys/publicKey.pem' as string,
    APP_PRIVATE_KEY_PATH: 'src/common/config/application-keys/privateKey.pem' as string,
    TOKEN_EXPIRY : 86400,
    PASSPHRASE : '',
    REDIS_URLS: {
        local: `redis://localhost:6379`
    },
    WINDOW_SIZE : 15 * 60 ,  // 15 minutes
    MAX_REQUESTS : 100,  // Limit per window
    KAFKA_CLIENTID:"Rate-Limiter",
    KAFKA_BROKER : "kafka:9092"
}

export default CONFIGURATION;