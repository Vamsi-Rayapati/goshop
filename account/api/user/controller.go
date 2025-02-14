package user

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/smartbot/account/pkg/validator"
)

type UserController struct {
	service UserService
}

func (uc UserController) OnboardUser(c *gin.Context) {

	log.Print("under onboard.......")
	var onboardRequest OnboardRequest
	err := validator.ValidateBody(c, &onboardRequest)

	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	log.Println("onboard valid success")

	response, onboardError := uc.service.OnboardUser(onboardRequest)
	if onboardError != nil {
		c.JSON(onboardError.Code, onboardError)
		return
	}

	c.JSON(http.StatusCreated, response)

}
