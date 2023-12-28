package handler

import (
	"log"
	"net/http"
	"picture_tagger_api/internal/service"

	"github.com/gin-gonic/gin"
)

type TagHandler struct {
	TagService service.TagService
}

func (h *TagHandler) GetAll(c *gin.Context) {
	tags, err := h.TagService.GetAll()
	if err != nil {
		log.Fatal("Problem retrieving tags list")
	}
	c.JSON(http.StatusOK, tags)
}
