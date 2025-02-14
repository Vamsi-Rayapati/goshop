package auth

import (
	"net/http"

	"github.com/FusionAuth/go-client/pkg/fusionauth"
	"github.com/smartbot/auth/models"
	"github.com/smartbot/auth/pkg/config"
	"github.com/smartbot/auth/pkg/fusionauthclient"
)

type AuthService struct {
}

func (service AuthService) Signup(user *SignupRequest) (*SignupResponse, *models.ApiError) {
	var client = fusionauthclient.NewClient()
	// client.ValidateJWT()

	request := fusionauth.RegistrationRequest{
		Registration: fusionauth.UserRegistration{
			Roles:         []string{"user"},
			ApplicationId: config.Config.FaAppId,
		},
		User: fusionauth.User{
			Email: user.Email,
			SecureIdentity: fusionauth.SecureIdentity{
				Password: user.Password,
			},
		},
	}

	res, faError, err := client.Register("", request)

	parsedFaError := ParseFusionAuthError(faError)

	if parsedFaError != nil {
		if parsedFaError.Code == "[duplicate]user.email" {
			return nil, &models.ApiError{
				Code:    http.StatusConflict,
				Message: "Email already exists",
			}
		}

		return nil, &models.ApiError{
			Code:    http.StatusInternalServerError,
			Message: "Failed to signup",
		}
	}

	if err != nil {
		return nil, &models.ApiError{
			Code:    http.StatusInternalServerError,
			Message: "Failed to signup",
		}

	}

	return &SignupResponse{
		UserId:       res.User.Id,
		Token:        res.Token,
		RefreshToken: res.RefreshToken,
	}, nil

}

func (service AuthService) Login(user *LoginRequest) (*LoginResponse, *models.ApiError) {
	var client = fusionauthclient.NewClient()

	request := fusionauth.LoginRequest{
		BaseLoginRequest: fusionauth.BaseLoginRequest{
			ApplicationId: config.Config.FaAppId,
		},
		LoginId:  user.Email,
		Password: user.Password,
	}

	res, faError, err := client.Login(request)

	parsedFaError := ParseFusionAuthError(faError)

	if res.StatusCode == 404 {
		return nil, &models.ApiError{
			Code:    http.StatusNotFound,
			Message: "Email or Password incorrect",
		}
	}

	if parsedFaError != nil || err != nil {
		return nil, &models.ApiError{
			Code:    http.StatusInternalServerError,
			Message: "Failed to login",
		}
	}

	return &LoginResponse{
		UserId:       res.User.Id,
		Token:        res.Token,
		RefreshToken: res.RefreshToken,
	}, nil
}
