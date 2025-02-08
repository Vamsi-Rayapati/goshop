package user

import "github.com/gin-gonic/gin"

type UserController struct {
	service UserService
}

func (uc UserController) OnboardUser(c *gin.Context) {
	uc.service.OnboardUser()
}
