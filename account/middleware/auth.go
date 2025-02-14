package middleware

import (
	"crypto/rsa"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// var jwtKey = "ZDNhYjgyZWYzYTkwNTRiN2NkNjA2MTEyMjI1YTk3ZjM="

var publicKeyPEM = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuygueOwU5z1FFbutNU9zrlxbTKvv69SP3xvaBFDQ98Sa8SeY/WRiodLIY1bQPPDcO2UudD6m/RF2+ZjzN6JkfbjTmX4aJGS3q5XSY3mWO+S86mxCPJHferdsjAYBswzRGN+XnTvUS/uaa9Ew9otFFdgDUNY7cYNtPz4i54iKyjP+34ltWsQ/BOQ7u5yG2s2RmIUuvxk7by5/lw/4P1QVoUhLK3IYz7BxM+KrqRvIzvExORpFCRgBBOkDshQtB+uIeS7+UDIz3g84OaMhgjGGQ4OdJbAwierni0RCFR0oQY+lzKw2ciX5n5b0QIJoQp2+rGA8Z6urqN9Wl5rurVdmMwIDAQAB"

// var jwtKey = config.Config.FaSecret
// var publicKeyPEM = `-----BEGIN PUBLIC KEY-----
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuygueOwU5z1FFbutNU9z
// rlxbTKvv69SP3xvaBFDQ98Sa8SeY/WRiodLIY1bQPPDcO2UudD6m/RF2+ZjzN6Jk
// fbjTmX4aJGS3q5XSY3mWO+S86mxCPJHferdsjAYBswzRGN+XnTvUS/uaa9Ew9otF
// FdgDUNY7cYNtPz4i54iKyjP+34ltWsQ/BOQ7u5yG2s2RmIUuvxk7by5/lw/4P1QV
// oUhLK3IYz7BxM+KrqRvIzvExORpFCRgBBOkDshQtB+uIeS7+UDIz3g84OaMhgjGG
// Q4OdJbAwierni0RCFR0oQY+lzKw2ciX5n5b0QIJoQp2+rGA8Z6urqN9Wl5rurVdm
// MwIDAQAB
// -----END PUBLIC KEY-----`

// Parse RSA public key
func parsePublicKey() (*rsa.PublicKey, error) {
	key, err := jwt.ParseRSAPublicKeyFromPEM([]byte(publicKeyPEM))
	if err != nil {
		return nil, err
	}
	return key, nil
}

func JWTMiddleWare() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing token"})
			c.Abort()
			return
		}
		tokenStr := strings.TrimPrefix(tokenString, "Bearer ")
		if tokenStr == tokenString {
			log.Print("Bearer prefix missing.")
			c.AbortWithStatusJSON(401, gin.H{"error": "Bearer token malformed"})
			return
		}
		publicKey, err := parsePublicKey()
		if err != nil {
			log.Printf("Failed to parse public key: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
			c.Abort()
			return
		}
		// log.Printf("jwt tokenString...... %v ", tokenStr)
		token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
			log.Printf("jwt parsed...... %v ", token.Header["alg"])
			if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
				log.Printf("under middleware...... %v ", token.Header["alg"])
				return nil, fmt.Errorf("Invalid Token: %v ", token.Header["alg"])
			}
			return publicKey, nil
		})
		// log.Printf("token...... %v ", token)
		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}
		c.Next()
	}
}
