package repository

import (
	"database/sql"
	"picture_tagger_api/internal/model"
)

type SQLTagRepository struct {
	db *sql.DB
}

type TagRepository interface {
	CreateTag(tag *model.Tag) (*model.Tag, error)
	DeleteTag(id int) error
	FindByName(name string) ([]model.Tag, error)
}

func NewSQLTagRepository(db *sql.DB) *SQLTagRepository {
	return &SQLTagRepository{db: db}
}

func (r *SQLTagRepository) CreateTag(tag *model.Tag) (*model.Tag, error) {
	_, err := r.db.Exec(
		"INSERT INTO tags (tag_name, tag_alias, tag_desc, is_hidden) VALUES (?, ?, ?, ?)",
		tag.Name, tag.Alias, tag.Desc, tag.IsHidden)
	if err != nil {
		return nil, err
	}
	return tag, nil
}

func (r *SQLTagRepository) DeleteTag(id int) error {
	_, err := r.db.Exec(
		"DELETE FROM tags WHERE id = ?",
		id)
	return err
}

func (r *SQLTagRepository) GetByName(name string) (*model.Tag, error) {
	query := "SELECT id, tag_name FROM tags WHERE tag_name = ?"
	row := r.db.QueryRow(query, name)

	var tag model.Tag
	err := row.Scan(&tag.ID, &tag.Name)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return &tag, nil
}

func (r *SQLTagRepository) FindByName(name string) ([]model.Tag, error) {
	query := "SELECT id, tag_name FROM tags WHERE tag_name LIKE ?"
	searchName := "%" + name + "%"
	rows, err := r.db.Query(query, searchName)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tags []model.Tag

	for rows.Next() {
		var tag model.Tag
		err := rows.Scan(&tag.ID, &tag.Name)
		if err != nil {
			return nil, err
		}

		tags = append(tags, tag)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return tags, nil
}
