package database

import (
	"time"

	"github.com/google/uuid"
)

type UserRole string

const (
	Usr        UserRole = "USER"
	Supervisor UserRole = "SUPERVISOR"
)

type UserStatus string

const (
	Active UserStatus = "ACTIVE"

	Inactive UserStatus = "INACTIVE"
)

type User struct {
	ID             uuid.UUID  `gorm:"type:char(36);primaryKey;default:(UUID())"`
	Username       string     `gorm:"type:varchar(255);not null;unique"`
	Firstname      string     `gorm:"type:varchar(255);not null"`
	Lastname       string     `gorm:"type:varchar(255);not null"`
	PrimaryAddress string     `gorm:"type:varchar(255)"`
	CountryCode    string     `gorm:"type:varchar(5)"`
	Mobile         string     `gorm:"type:varchar(15)"`
	Role           UserRole   `gorm:"type:enum('USER', 'SUPERVISOR');not null;default:'USER'"`
	Status         UserStatus `gorm:"type:enum('ACTIVE', 'INACTIVE');not null;default:'INACTIVE'"`
	CreatedAt      time.Time  `gorm:"autoCreateTime"`
	UpdatedAt      time.Time  `gorm:"autoUpdateTime"`
}
