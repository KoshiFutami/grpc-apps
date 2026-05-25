package main

import (
	"context"
	"log"
	"net"

	userv1 "github.com/koshifutami/grpc-apps/user-server/gen/user/v1"
	"google.golang.org/grpc"
)

type UserService struct {
	userv1.UnimplementedUserServiceServer
}

func (s *UserService) GetUser(
	ctx context.Context,
	req *userv1.GetUserRequest,
) (*userv1.GetUserResponse, error) {
	return &userv1.GetUserResponse{
		User: &userv1.User{
			UserId: req.GetUserId(),
			Name:   "Koshi Futami",
			Email:  "koshi@example.com",
		},
	}, nil
}

func main() {
	listener, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	server := grpc.NewServer()

	userv1.RegisterUserServiceServer(server, &UserService{})

	log.Println("user server listening on :50051")

	if err := server.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
