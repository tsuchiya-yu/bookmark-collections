.PHONY: up down reset

up:
	@npx supabase start
	@docker compose up -d

down:
	@docker compose down
	@npx supabase stop

reset: down
	@npx supabase stop --no-backup
	@npx supabase start
	@docker compose up -d
