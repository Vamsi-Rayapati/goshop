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
	Username       string `json:"username" validate:"required,email"`
	FirstName      string `json:"first_name" validate:"required"`
	LastName       string `json:"last_name" validate:"required"`
	PrimaryAddress string `json:"primary_address"`
	Mobile         string `json:"mobile" validate:"mobileNo"`
	Role           string `json:"role" validate:"required,oneof=USER SUPERVISOR"`
}

type UserResponse struct {
	ID             string              `json:"id"`
	Username       string              `json:"username"`
	Firstname      string              `json:"first_name"`
	Lastname       string              `json:"last_name"`
	PrimaryAddress string              `json:"primary_address"`
	Mobile         string              `json:"mobile"`
	Role           database.UserRole   `json:"role"`
	Status         database.UserStatus `json:"status"`
}

type UsersResponse struct {
	Users []UserResponse `json:"users"`
	Total int64          `json:"total"`
}
