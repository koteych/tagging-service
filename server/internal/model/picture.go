package model

type Picture struct {
	ID       int
	Title    string
	Desc     string
	Source   string
	Tags     []Tag
	IsHidden bool
}
