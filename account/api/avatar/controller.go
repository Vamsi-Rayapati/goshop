package avatar

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/smartbot/account/pkg/validator"
)

type AvatarController struct {
	service AvatarService
}

func (ac *AvatarController) GetProfileSignedUrl(c *gin.Context) {
	var request SignedUrlRequest
	err := validator.ValidateBody(c, &request)

	if err != nil {
		c.JSON(err.Code, err)
		return
	}

	res, err := ac.service.GetAvatarSignedUrl(request)

	if err != nil {
		c.JSON(err.Code, err)
		return
	}

	c.JSON(http.StatusCreated, res)

}

func (ac *AvatarController) SaveAvatar(c *gin.Context) {
	var request SaveAvatarRequest
	userId := c.Param("id")

	err := validator.ValidateUUID(userId)
	if err != nil {
		c.JSON(err.Code, err)
		return
	}

	err = validator.ValidateBody(c, &request)
	if err != nil {
		c.JSON(err.Code, err)
		return
	}

	err = ac.service.SaveAvatar(userId, request)
	if err != nil {
		c.JSON(err.Code, err)
		return
	}

	c.Status(200)

}
