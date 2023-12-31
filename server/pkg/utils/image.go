package utils

import (
	"picture_tagger_api/internal/model"
	"strings"
)

// FIX: hardcoded URLs
func GetPictureURL(picture model.Picture) string {
	if len(picture.Source) == 0 {
		return "none"
	}
	if strings.HasPrefix(picture.Source, "http") {
		return picture.Source
	} else {
		return "http://localhost:8080/static/" + picture.Source
	}
}
