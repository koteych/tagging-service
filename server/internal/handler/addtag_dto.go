package handler

type AddTagDTO struct {
	PictureId int    `json:"picture_id"`
	Name      string `json:"tag_name"`
	Alias     string `json:"tag_alias"`
	Desc      string `json:"tag_desc"`
}
