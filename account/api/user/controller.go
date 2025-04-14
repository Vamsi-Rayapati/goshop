package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/smartbot/account/pkg/validator"
)

type UserController struct {
	service UserService
}

func (uc *UserController) OnboardUser(c *gin.Context) {

	var onboardRequest OnboardRequest
	err := validator.ValidateBody(c, &onboardRequest)

	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	userId, _ := c.Get("user_id")
	userName, _ := c.Get("username")

	response, err := uc.service.OnboardUser(userId.(string), userName.(string), onboardRequest)
	if err != nil {
		c.JSON(err.Code, err)
		return
	}

	c.JSON(http.StatusCreated, response)

}

func (uc *UserController) GetCurrentUser(c *gin.Context) {

	value, _ := c.Get("user_id")

	res, err := uc.service.GetUser(value.(string))

	if err != nil {
		c.JSON(err.Code, err)
		return
	}
	c.JSON(http.StatusOK, res)
}

func (uc *UserController) GetUsers(c *gin.Context) {
	users, err := uc.service.GetUsers()

	if err != nil {
		c.JSON(err.Code, err)
		return
	}

	c.JSON(http.StatusOK, users)

}

func (uc *UserController) GetUser(c *gin.Context) {
	userId := c.Param("id")
	err := validator.ValidateUUID(userId)
	if err != nil {
		c.JSON(err.Code, err)
		return
	}

	res, err := uc.service.GetUser(userId)

	if err != nil {
		c.JSON(err.Code, err)
		return
	}
	c.JSON(http.StatusOK, res)

}

func (uc *UserController) PostUser(c *gin.Context) {
	var postRequest CreateUserRequest
	err := validator.ValidateBody(c, &postRequest)

	if err != nil {
		c.JSON(err.Code, err)
		return
	}

	res, err := uc.service.AddUser(postRequest)

	if err != nil {
		c.JSON(err.Code, err)
		return
	}

	c.JSON(http.StatusCreated, res)

}

func (uc *UserController) DeleteUser(c *gin.Context) {
	userId := c.Param("id")
	err := validator.ValidateUUID(userId)
	if err != nil {
		c.JSON(err.Code, err)
		return
	}

}

func (uc *UserController) UpdateUser(c *gin.Context) {
	userId := c.Param("id")
	err := validator.ValidateUUID(userId)
	if err != nil {
		c.JSON(err.Code, err)
		return
	}

}
