#!/bin/bash

./node_modules/.bin/openapi-generator-cli generate -i schema/schema.yaml -g rust -o schema/schema-rs/ --global-property models,modelDocs=false

for file in "schema/schema-rs/src/models"/*; do
    sed -i 's/#\[derive(\(.*\), Serialize, Deserialize)]/#\[derive(\1, Serialize, Deserialize, specta::Type)]/' "$file"
done

mv schema/schema-rs/src/models/* src-tauri/src/models/
rm -r schema/schema-rs/

ls src-tauri/src/models/ | sed 's/\([a-zA-Z_][a-zA-Z0-9_]*\)\.rs/pub mod \1;/' > src-tauri/src/models.rs

