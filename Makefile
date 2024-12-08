# Expand common git aliases
GA = git add
GC = git commit
GGPUSH = git push origin HEAD

# Get current date
DATE := $(shell date)

.PHONY: push

push:
	@echo "Pushing journal updates..."
	cd blog/content/journal && \
		$(GA) . && \
		$(GC) -m "journal $(DATE)" --allow-empty && \
		$(GGPUSH) && \
		cd ../.. && \
		$(GA) content/journal && \
		$(GC) -m "journal infor $(DATE)" && \
		$(GGPUSH)

# Help target
help:
	@echo "Available targets:"
	@echo "  push  - Update and push journal changes with timestamped commits"
	@echo "  help  - Show this help message"