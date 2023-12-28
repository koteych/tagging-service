package repository

import (
	"database/sql"
	"picture_tagger_api/internal/model"
)

type SQLPictureRepository struct {
	db *sql.DB
}

type PictureRepository interface {
	GetPictureByID(id int) (*model.Picture, error)
	CreatePicture(picture *model.Picture) (*model.Picture, error)
	UpdatePicture(picture *model.Picture) error
	DeletePicture(id int) error
	AssignTagById(pId int, tId int) error
}

func NewSQLPictureRepository(db *sql.DB) *SQLPictureRepository {
	return &SQLPictureRepository{db: db}
}

func (r *SQLPictureRepository) CreatePicture(picture *model.Picture) (*model.Picture, error) {
	_, err := r.db.Exec(
		"INSERT INTO pictures (picture_title, picture_desc, picture_source, is_hidden) VALUES (?, ?, ?, ?)",
		picture.Title, picture.Desc, picture.Source, picture.IsHidden)
	if err != nil {
		return nil, err
	}
	return picture, nil
}

func (r *SQLPictureRepository) DeletePicture(id int) error {
	return nil
}

func (r *SQLPictureRepository) GetPictureByID(id int) (*model.Picture, error) {
	return nil, nil
}

func (r *SQLPictureRepository) UpdatePicture(picture *model.Picture) error {
	return nil
}

func (r *SQLPictureRepository) AssignTagById(pId int, tId int) error {
	_, err := r.db.Exec("INSERT INTO picture_tag_link VALUES (?, ?)", pId, tId)
	return err
}
