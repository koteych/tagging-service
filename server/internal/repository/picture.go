package repository

import (
	"database/sql"
	"picture_tagger_api/internal/model"
	"picture_tagger_api/pkg/utils"
	"strconv"
	"strings"
)

func placeholders(count int) string {
	return strings.Repeat("?, ", count-1) + "?"
}

type SQLPictureRepository struct {
	db *sql.DB
}

type PictureRepository interface {
	GetPictureByID(id int) (*model.Picture, error)
	CreatePicture(picture *model.Picture) (*model.Picture, error)
	UpdatePicture(picture *model.Picture) error
	DeletePicture(id int) error
	AssignTagById(pId int, tId int) error
	GetWithTags(tags []model.Tag) ([]model.Picture, error)
	GetTags(picId int) ([]model.Tag, error)
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

func (r *SQLPictureRepository) GetTags(picId int) ([]model.Tag, error) {
	query := "select t.* from tags t join picture_tag_link ptl on ptl.tag_id = t.id where ptl.picture_id = ?;"

	rows, err := r.db.Query(query, picId)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var tags []model.Tag

	for rows.Next() {
		var tag model.Tag

		err := rows.Scan(&tag.ID, &tag.Name, &tag.Alias, &tag.Desc, &tag.IsHidden)
		if err != nil {
			return nil, err
		}

		tags = append(tags, tag)
	}

	return tags, nil
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

// if tags is an empty slice then we will retrieve all pictures there are
func (r *SQLPictureRepository) GetWithTags(tags []model.Tag) ([]model.Picture, error) {
	var tagNames []interface{}

	for _, tag := range tags {
		tagNames = append(tagNames, tag.Name)
	}
	var rows *sql.Rows
	var err error

	if len(tagNames) > 0 {
		query := `SELECT p.*
		FROM pictures p
		JOIN picture_tag_link ptl ON p.id = ptl.picture_id
		JOIN tags t ON ptl.tag_id = t.id
		WHERE t.tag_name IN (` + placeholders(len(tagNames)) + `)
		GROUP BY p.id
		HAVING COUNT(DISTINCT t.id) = ` + strconv.Itoa(len(tagNames)) + `;`

		rows, err = r.db.Query(query, tagNames...)
	} else {
		query := `SELECT * FROM pictures p;`

		rows, err = r.db.Query(query, tagNames...)
	}

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var pics []model.Picture

	for rows.Next() {
		var pic model.Picture
		err := rows.Scan(&pic.ID, &pic.Title, &pic.Desc, &pic.Source, &pic.IsHidden)
		if err != nil {
			return nil, err
		}

		pic.Source = utils.GetPictureURL(pic)

		pics = append(pics, pic)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return pics, nil
}
