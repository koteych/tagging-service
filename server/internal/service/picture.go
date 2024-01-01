package service

import (
	"picture_tagger_api/internal/model"
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

func (s *PictureService) AddTag(picId int, tag model.Tag) error {
	foundTag, err := s.tagRepo.GetByName(tag.Name)
	if err != nil {
		return err
	}

	if foundTag != nil {
		err = s.pictureRepo.AssignTagById(picId, foundTag.ID)
		if err != nil {
			return err
		}
	}

	_, err = s.tagRepo.CreateTag(&tag)
	if err != nil {
		return err
	}

	newTag, err := s.tagRepo.GetByName(tag.Name)
	if err != nil {
		return err
	}

	err = s.pictureRepo.AssignTagById(picId, newTag.ID)
	if err != nil {
		return err
	}

	return nil
}

func (s *PictureService) GetWithTagNames(tagNames []string) ([]model.Picture, error) {
	var tags []model.Tag
	for _, name := range tagNames {
		tag := model.Tag{
			ID:       0,
			Name:     name,
			Desc:     "",
			Alias:    "",
			IsHidden: false,
		}
		tags = append(tags, tag)
	}

	return s.pictureRepo.GetWithTags(tags)
}
