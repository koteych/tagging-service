package handler

import (
	"net/http"
	"picture_tagger_api/internal/service"
	"strconv"

	"github.com/gin-gonic/gin"
)

type PictureHandler struct {
	PictureService service.PictureService
}

func (h *PictureHandler) AssignTagById(c *gin.Context) {
	picId, err := strconv.Atoi(c.Param("picture_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid integer value"})
		return
	}

	tagId, err := strconv.Atoi(c.Param("tag_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid integer value"})
		return
	}

	h.PictureService.AssignTagById(picId, tagId)
	c.JSON(http.StatusOK, gin.H{
		"picture_id": picId,
		"tag_id":     tagId,
	})
}
