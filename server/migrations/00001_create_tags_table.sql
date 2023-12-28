-- +goose Up	
    CREATE TABLE IF NOT EXISTS tags (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		tag_name TEXT NOT NULL,
		tag_alias TEXT NOT NULL,
		tag_desc TEXT NOT NULL,
		is_hidden INTEGER CHECK (is_hidden IN (0, 1))
	);

-- +goose Down
    DROP TABLE tags;