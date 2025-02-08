package main

import (
	"fmt"

	"log"

	"github.com/smartbot/account/api"
	"github.com/smartbot/account/models"
	"github.com/smartbot/account/pkg/config"
)

func main() {
	config.LoadConfig()

	config.ConnectDB()
	err := config.DB.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatalf("Migration failed: %v", err)
	}
	r := api.RegisterRoutes()
	r.Run(fmt.Sprintf("%s%d", ":", config.Config.Port))

}
