package utils

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

func InitDB() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", "./data.db")
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		db.Close()
		return nil, err
	}

	return db, nil
}

func PopulateDB(db *sql.DB) error {
	createTableSQL := `
	CREATE TABLE IF NOT EXISTS tags (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		tag_name TEXT NOT NULL,
		tag_alias TEXT NOT NULL,
		tag_desc TEXT NOT NULL,
		is_hidden INTEGER CHECK (is_hidden IN (0, 1))
	)
	`

	_, err := db.Exec(createTableSQL)
	return err
}
