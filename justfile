default:
  just build

rsync_flags := "-a"

build flags=rsync_flags:
  rm -rf dist
  mkdir -p dist
  rsync {{flags}} \
    --exclude='dist' --exclude='.git' --exclude='*.md' --exclude='justfile' \
    . dist/

zip: build
  cd dist && zip -r ../monospace-everything-$(jq -r .version ./manifest.json).zip .

build-verb:
  just build "-avh --progress"

clean:
  rm -rf dist monospace-everything-*.zip

check:
  jq empty ./manifest.json
