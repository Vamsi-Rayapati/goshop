package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/smartbot/account/api/avatar"
	"github.com/smartbot/account/api/user"
	"github.com/smartbot/account/middleware"
)

func RegisterRoutes() *gin.Engine {
	router := gin.New()
	router.Use(gin.Logger())
	accountGroup := router.Group("/account/api/v1")

	// authenticated routes
	accountGroup.Use(middleware.Authenticate())
	{
		user.RegisterRoutes(accountGroup)
		avatar.RegisterRoutes(accountGroup)
	}

	router.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{})
		c.Abort()
	})
	return router

}
