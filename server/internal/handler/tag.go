package handler

import (
	"net/http"
	"picture_tagger_api/internal/service"

	"github.com/gin-gonic/gin"
)

type TagHandler struct {
	TagService service.TagService
}

func (h *TagHandler) GetAll(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
	})
}
