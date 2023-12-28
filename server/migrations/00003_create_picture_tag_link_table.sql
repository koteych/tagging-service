-- +goose Up	
	CREATE TABLE IF NOT EXISTS picture_tag_link (
		picture_id INTEGER NOT NULL,
		tag_id INTEGER NOT NULL,    
		PRIMARY KEY (picture_id, tag_id),
		FOREIGN KEY (picture_id) REFERENCES pictures(id),
		FOREIGN KEY (tag_id) REFERENCES tags(id)
	);

-- +goose Down
    DROP TABLE picture_tag_link;