package user

import "log"

type UserService struct {
}

func (us UserService) OnboardUser() {
	log.Println("UserService")
}
