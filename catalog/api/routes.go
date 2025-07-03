package api

import (
	"github.com/gin-gonic/gin"
	"github.com/smartbot/catalog/api/categories"
	"github.com/smartbot/catalog/api/products"
	"github.com/smartbot/catalog/middleware"
)

func RegisterRoutes() *gin.Engine {
	router := gin.New()
	router.Use(gin.Logger())
	catalogGroup := router.Group("/catalog/api/v1")

	catalogGroup.Use(middleware.Authenticate())
	categories.RegisterRoutes(catalogGroup)
	products.RegisterRoutes(catalogGroup)

	return router
}
