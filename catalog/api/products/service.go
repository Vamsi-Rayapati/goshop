package products

import (
	"github.com/smartbot/catalog/database"
	"github.com/smartbot/catalog/pkg/dbclient"
	"github.com/smartbot/catalog/pkg/errors"
	"github.com/smartbot/catalog/pkg/utils"
)

type ProductsService struct {
}

func (ps *ProductsService) GetProducts(req GetProductsRequest) (*ProductsResponse, *errors.ApiError) {
	db := dbclient.GetCient()
	var products []database.Product
	var total int64
	db.Model(&database.Product{}).Count(&total)
	result := db.Order("created_at").Limit(req.PageSize).Offset(req.PageSize * (req.PageNo - 1)).Find(&products)
	if result.Error != nil {
		return nil, errors.InternalServerError("Failed to get users")
	}

	productsList := utils.Map(products, func(product database.Product) ProductResponse {
		return ProductResponse{
			ID:          product.ID.String(),
			Name:        product.Name,
			Description: product.Description,
			Price:       product.Price,
			Stock:       product.Stock,
			CategoryID:  product.CategoryID,
			CreatedAt:   product.CreatedAt.String(),
		}
	})

	return &ProductsResponse{
		Products: productsList,
		Total:    total,
	}, nil

}

func (ps *ProductsService) GetProduct() {

}

func (ps *ProductsService) CreateProduct() {

}

func (ps *ProductsService) UpdateProduct() {

}

func (ps *ProductsService) DeleteProduct() {

}
