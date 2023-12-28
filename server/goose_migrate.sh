#!/bin/bash
GOOSE_MIGRATION_DIR=./migrations ~/go/bin/goose sqlite3 ./foo.db status
GOOSE_MIGRATION_DIR=./migrations ~/go/bin/goose sqlite3 ./data.db up