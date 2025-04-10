package user

import (
	"github.com/smartbot/account/database"
)

// validation models
type OnboardRequest struct {
	FirstName string `json:"first_name" validate:"required"`
	LastName  string `json:"last_name" validate:"required"`
}

type CreateUserRequest struct {
	Username       string `json:"username" validate:"required"`
	FirstName      string `json:"first_name" validate:"required"`
	LastName       string `json:"last_name" validate:"required"`
	PrimaryAddress string `json:"primary_address"`
	CountryCode    string `json:"country_code"`
	Mobile         string `json:"mobile"`
	Role           string `json:"role" validate:"required"`
}

type UserResponse struct {
	ID             string              `json:"id"`
	Username       string              `json:"username"`
	Firstname      string              `json:"first_name"`
	Lastname       string              `json:"last_name"`
	PrimaryAddress string              `json:"primary_address"`
	CountryCode    string              `json:"country_code"`
	Mobile         string              `json:"mobile"`
	Role           database.UserRole   `json:"role"`
	Status         database.UserStatus `json:"status"`
}

type UsersResponse struct {
	Users []User `json:"users"`
	Total int64  `json:"total"`
}
