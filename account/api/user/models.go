package user

import (
	"github.com/google/uuid"
	"github.com/smartbot/account/database"
)

type OnboardRequest struct {
	ID        uuid.UUID `json:"id" validate:"uuid,required"`
	UserName  string    `json:"user_name" validate:"email,required"`
	FirstName string    `json:"first_name" validate:"required"`
	LastName  string    `json:"last_name" validate:"required"`
}

type User struct {
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
