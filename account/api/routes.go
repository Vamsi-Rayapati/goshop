package api

import (
	"github.com/gin-gonic/gin"
	"github.com/smartbot/account/api/user"
	"github.com/smartbot/account/middleware"
)

func RegisterRoutes() *gin.Engine {
	router := gin.New()
	accountGroup := router.Group("/account/api/v1")

	// authenticated routes
	accountGroup.Use(middleware.JWTMiddleWare())
	{
		user.RegisterRoutes(accountGroup)
	}
	return router

}
