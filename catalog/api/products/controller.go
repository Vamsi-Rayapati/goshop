package products

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/smartbot/catalog/pkg/validator"
)

type ProductsController struct {
	service ProductsService
}

func (pc *ProductsController) GetProducts(c *gin.Context) {
	var request GetProductsRequest
	err := validator.ValidateQueryParams(c, &request)

	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	res, err := pc.service.GetProducts(request)

	if err != nil {
		c.JSON(err.Code, err)
		return
	}

	c.JSON(http.StatusOK, res)
}

func (pc *ProductsController) GetProduct(c *gin.Context) {

}

func (pc *ProductsController) CreateProduct(c *gin.Context) {

}

func (pc *ProductsController) UpdateProduct(c *gin.Context) {

}

func (pc *ProductsController) DeleteProduct(c *gin.Context) {

}
