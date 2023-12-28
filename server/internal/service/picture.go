package service

import (
	"picture_tagger_api/internal/repository"
)

type PictureService struct {
	pictureRepo repository.PictureRepository
	tagRepo     repository.TagRepository
}

func NewPictureService(pictureRepo repository.PictureRepository, tagRepo repository.TagRepository) *PictureService {
	return &PictureService{pictureRepo: pictureRepo, tagRepo: tagRepo}
}

func (s *PictureService) AssignTagById(pId int, tId int) error {
	err := s.pictureRepo.AssignTagById(pId, tId)
	return err
}

func (s *PictureService) AddTag(name string) error {
	return nil
}
