
# authenticate dev to every supported upstream service
signin:
	@echo "Don't have a token? Create one at https://github.com/settings/tokens"
	yarn npm login --scope=apeswapfinance
