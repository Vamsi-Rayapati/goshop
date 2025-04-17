package avatar

import (
	"github.com/smartbot/account/database"
	"github.com/smartbot/account/pkg/aws"
	"github.com/smartbot/account/pkg/dbclient"
	"github.com/smartbot/account/pkg/errors"
)

type AvatarService struct {
}

func (as *AvatarService) GetAvatarSignedUrl(request SignedUrlRequest) (*SignedUrlResponse, *errors.ApiError) {

	url, key, err := aws.GetNewSignedUrl("goshop-avatar", request.FileName, request.ContentType)

	if err != nil {
		return nil, err
	}

	return &SignedUrlResponse{
		UploadUrl: *url,
		FilePath:  *key,
	}, nil

}

func (ac *AvatarService) SaveAvatar(userId string, request SaveAvatarRequest) *errors.ApiError {
	db := dbclient.GetCient()

	result := db.Model(&database.User{}).Where("id = ?", userId).Update("avatar", request.Avatar)

	if result.Error != nil {
		return errors.InternalServerError("Failed to update avatar")
	}

	return nil

}
