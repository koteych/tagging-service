package main

import (
	"log"

	"picture_tagger_api/internal/handler"
	"picture_tagger_api/internal/repository"
	"picture_tagger_api/internal/service"
	"picture_tagger_api/pkg/utils"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.Static("/static", "./pictures")

	db, err := utils.InitDB()
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer db.Close()

	pictureRepo := repository.NewSQLPictureRepository(db)
	tagRepo := repository.NewSQLTagRepository(db)

	pictureService := service.NewPictureService(pictureRepo, tagRepo)
	tagService := service.NewTagService(pictureRepo, tagRepo)

	pictureHandler := &handler.PictureHandler{
		PictureService: *pictureService,
	}

	tagHandler := &handler.TagHandler{
		TagService: *tagService,
	}

	r.POST("/api/pictures/:picture_id/assign-tag/:tag_id", pictureHandler.AssignTagById)
	r.POST("/api/pictures/get-by-tag-names", pictureHandler.GetByTagNames)
	r.POST("/api/pictures/add-tag", pictureHandler.AddTag)

	r.GET("/api/tags", tagHandler.GetAll)

	r.Run()
}
