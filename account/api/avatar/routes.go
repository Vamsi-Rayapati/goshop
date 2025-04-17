package avatar

import "github.com/gin-gonic/gin"

func RegisterRoutes(route *gin.RouterGroup) {
	ac := AvatarController{
		service: AvatarService{},
	}
	route.POST("/avatar/upload_url", ac.GetProfileSignedUrl)
	route.POST("/avatar/:id", ac.SaveAvatar)

}
