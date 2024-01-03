package handler

import (
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
)

func UploadImageHandler(c *gin.Context) {
	file, header, err := c.Request.FormFile("picture")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to get file"})
		return
	}

	defer file.Close()

	if !isValidImageType(header) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid file type"})
		return
	}

	filename := generateUniqueFilename(header.Filename)

	savePath := filepath.Join("pictures", filename)

	if err := os.MkdirAll("pictures", 0755); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create directory"})
		return
	}

	out, err := os.Create(savePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to save file"})
		return
	}

	defer out.Close()

	_, err = file.Seek(0, 0)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to reset file pointer"})
		return
	}

	if _, err := io.Copy(out, file); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to copy file"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ok", "filePath": savePath})
}

func isValidImageType(header *multipart.FileHeader) bool {
	allowedTypes := []string{"image/jpeg", "image/png", "image/gif"}
	contentType := header.Header.Get("Content-Type")

	for _, t := range allowedTypes {
		if contentType == t {
			return true
		}
	}

	return false
}

func generateUniqueFilename(filename string) string {
	return fmt.Sprintf("%d_%s", time.Now().Unix(), filename)
}
