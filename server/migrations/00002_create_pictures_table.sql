-- +goose Up	
	CREATE TABLE IF NOT EXISTS pictures (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		picture_title TEXT NOT NULL,
		picture_desc TEXT NOT NULL,
		picture_source TEXT NOT NULL,
		is_hidden INTEGER CHECK (is_hidden IN (0, 1))
	);

-- +goose Down
    DROP TABLE pictures;