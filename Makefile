# tools

default: update

update:
	git add .
	git commit -m "update"
	git push -u origin main