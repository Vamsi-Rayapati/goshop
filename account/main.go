package main

import (
	"fmt"

	"github.com/smartbot/account/api"
	"github.com/smartbot/account/pkg/config"
)

func main() {
	config.LoadConfig()
	r := api.RegisterRoutes()
	r.Run(fmt.Sprintf("%s%d", ":", config.Config.Port))
}
