package config

import (
	"github.com/spf13/viper"
)

type ApplicationConfig struct {
	Port       int
	DbHost     string
	DbPort     int
	DbUserName string
	DbPassword string
}

var Config *ApplicationConfig

func LoadConfig() *ApplicationConfig {
	viper.SetConfigFile(".env")
	viper.AutomaticEnv()
	viper.ReadInConfig()

	Config = &ApplicationConfig{
		Port:       viper.GetInt("PORT"),
		DbHost:     viper.GetString("DB_HOST"),
		DbPort:     viper.GetInt("DB_PORT"),
		DbUserName: viper.GetString("DB_USER_NAME"),
		DbPassword: viper.GetString("DB_PASSWORD"),
	}

	return Config

}
