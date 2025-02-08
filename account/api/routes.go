package api

import (
	"github.com/gin-gonic/gin"
	"github.com/smartbot/account/api/user"
)

func RegisterRoutes() *gin.Engine {
	router := gin.New()
	accountGroup := router.Group("/account/api/v1")

	user.RegisterRoutes(accountGroup)

	return router

}
