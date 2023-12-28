package service

import (
	"picture_tagger_api/internal/model"
	"picture_tagger_api/internal/repository"
)

type TagService struct {
	pictureRepo repository.PictureRepository
	tagRepo     repository.TagRepository
}

func NewTagService(pictureRepo repository.PictureRepository, tagRepo repository.TagRepository) *TagService {
	return &TagService{pictureRepo: pictureRepo, tagRepo: tagRepo}
}

func (s *TagService) FindByName(name string) ([]model.Tag, error) {
	return s.tagRepo.FindByName(name)
}
