.PHONY: dev build lint preview deploy install clean

dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

preview:
	npm run preview

deploy:
	vercel --prod

install:
	npm install

clean:
	rm -rf dist node_modules/.vite
