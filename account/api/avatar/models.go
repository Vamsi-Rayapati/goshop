package avatar

type SignedUrlRequest struct {
	FileName    string `json:"file_name" validate:"required"`
	ContentType string `json:"content_type"  validate:"required"`
}

type SignedUrlResponse struct {
	UploadUrl string `json:"upload_url"`
	FilePath  string `json:"path"`
}

type SaveAvatarRequest struct {
	Avatar string `json:"avatar" validate:"required"`
}
