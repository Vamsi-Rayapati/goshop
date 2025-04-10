package validator

import (
	error "errors"
	"reflect"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"github.com/smartbot/account/pkg/errors"
)

func GetMessageByTag(tag string) string {
	switch tag {
	case "required":
		return "required field"
	case "email":
		return "invalid email format"
	default:
		return tag
	}
}

func ValidateUUID(id string) *errors.ApiError {
	_, err := uuid.Parse(id)
	if err != nil {
		return errors.ValidationError("Invalid UUID, Please provide a valid UUID", []errors.FieldError{})
	}

	return nil
}
func ValidateBody(c *gin.Context, obj any) *errors.ApiError {
	if err := c.ShouldBindJSON(obj); err != nil {
		return errors.ValidationError("Invalid request payload", []errors.FieldError{})
	}

	var validate = validator.New()

	validate.RegisterTagNameFunc(func(field reflect.StructField) string {
		return field.Tag.Get("json")
	})

	if err := validate.Struct(obj); err != nil {
		var ve validator.ValidationErrors
		if error.As(err, &ve) {
			validationErrors := []errors.FieldError{}

			for _, e := range ve {
				validationErrors = append(validationErrors, errors.FieldError{Field: e.Field(), Message: GetMessageByTag(e.Tag())})
			}

			return errors.ValidationError("Invalid request payload", validationErrors)
		}
		return errors.ValidationError("Invalid request payload", []errors.FieldError{})
	}

	return nil

}
