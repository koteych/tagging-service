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

func (h *PictureHandler) GetByTagNames(c *gin.Context) {

	page, err := strconv.Atoi(c.Query("page"))
	if err != nil {
		page = 0
	}
	pageSize, err := strconv.Atoi(c.Query("pageSize"))
	if err != nil {
		pageSize = 10
	}

	type Tags struct {
		Data []string `json:"tags"`
	}

	var tags Tags

	if err := c.ShouldBindJSON(&tags); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	pictures, err := h.PictureService.GetWithTagNames(tags.Data)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"ok": false,
		})
	}

	startIndex := (page - 1) * pageSize
	endIndex := startIndex + pageSize
	if endIndex > len(pictures) {
		endIndex = len(pictures)
	}

	paginatedPictures := pictures[startIndex:endIndex]

	c.JSON(http.StatusOK, gin.H{
		"pictures": paginatedPictures,
		"total":    len(pictures),
	})
}
