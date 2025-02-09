package user

import (
	"log"

	"github.com/smartbot/account/database"
	"github.com/smartbot/account/models"
	"github.com/smartbot/account/pkg/dbclient"
)

type UserService struct {
}

func (us UserService) OnboardUser(user OnboardRequest) (*User, *models.ApiError) {
	db := dbclient.GetCient()
	newUser := database.User{
		ID:        user.ID,
		Username:  user.UserName,
		Firstname: user.FirstName,
		Lastname:  user.LastName,
		Status:    database.Active,
	}
	result := db.Create(&newUser)

	if result.Error != nil {
		log.Fatalf("OnboardUser: %+v", result.Error)
		return nil, &models.ApiError{Message: "Failed to create user", Code: 500}
	}

	return &User{
		ID:             newUser.ID.String(),
		Username:       newUser.Username,
		Firstname:      newUser.Firstname,
		Lastname:       newUser.Lastname,
		PrimaryAddress: newUser.PrimaryAddress,
		CountryCode:    newUser.CountryCode,
		Mobile:         newUser.Mobile,
		Role:           newUser.Role,
		Status:         newUser.Status,
	}, nil

}
