package user

import (
	"log"

	"github.com/google/uuid"
	"github.com/smartbot/account/database"
	"github.com/smartbot/account/pkg/dbclient"
	"github.com/smartbot/account/pkg/errors"
	"github.com/smartbot/account/pkg/utils"
	"gorm.io/gorm"
)

type UserService struct {
}

func (us UserService) GetUser(id string) (*UserResponse, *errors.ApiError) {
	db := dbclient.GetCient()
	var user database.User
	result := db.Where("id = ?", id).First(&user)

	if result.Error != nil {
		log.Println("GetUser: %+v", result.Error)
		if result.Error == gorm.ErrRecordNotFound {
			return nil, errors.NotFoundError("User not found")
		}

		return nil, errors.InternalServerError("Failed to get user")
	}

	return &UserResponse{
		ID:             user.ID.String(),
		Username:       user.Username,
		Firstname:      user.Firstname,
		Lastname:       user.Lastname,
		PrimaryAddress: user.PrimaryAddress,
		CountryCode:    user.CountryCode,
		Mobile:         user.Mobile,
		Role:           user.Role,
		Status:         user.Status,
	}, nil
}

func (us UserService) OnboardUser(userId string, userName string, user OnboardRequest) (*UserResponse, *errors.ApiError) {
	db := dbclient.GetCient()
	userIdParsed, _ := uuid.Parse(userId)
	newUser := database.User{
		ID:        userIdParsed,
		Username:  userName,
		Firstname: user.FirstName,
		Lastname:  user.LastName,
		Status:    database.Active,
	}
	result := db.Create(&newUser)

	if result.Error != nil {
		log.Fatalf("OnboardUser: %+v", result.Error)
		return nil, errors.InternalServerError("Failed to create user")
	}

	return &UserResponse{
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

func (us UserService) getUsers() (*UsersResponse, *errors.ApiError) {
	db := dbclient.GetCient()
	var users []database.User
	var total int64

	db.Model(&database.User{}).Count(&total)
	result := db.Find(&users)

	if result.Error != nil {
		return nil, errors.InternalServerError("Failed to get users")
	}

	userList := utils.Map(users, func(user database.User) UserResponse {
		return UserResponse{
			ID:             user.ID.String(),
			Username:       user.Username,
			Firstname:      user.Firstname,
			Lastname:       user.Lastname,
			PrimaryAddress: user.PrimaryAddress,
			CountryCode:    user.CountryCode,
			Mobile:         user.Mobile,
			Role:           user.Role,
			Status:         user.Status,
		}
	})

	return &UsersResponse{
		Users: userList,
		Total: total,
	}, nil

}
