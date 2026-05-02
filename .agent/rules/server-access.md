# Server & SSH Access — Operations Policy

> Вынесено из GEMINI.md для соблюдения лимита rule editor.
> GEMINI.md ссылается на этот файл.

## Сервер

- VPS: `116.118.9.78`
- Пользователь: `deploy`
- SSH ключ: `C:\Users\max\.ssh\openclaw_vps`
- Sudo пароль deploy: [ПАРОЛЬ ЗАПРАШИВАЕТСЯ У ВЛАДЕЛЬЦА]
- Root прямой вход запрещён (`PermitRootLogin no`)

## Протокол подключения

1. SSH через deploy: `ssh -i C:\Users\max\.ssh\openclaw_vps -o StrictHostKeyChecking=no deploy@116.118.9.78`
2. Для root-операций: `sudo -i` внутри deploy-сессии
3. Никогда не `ssh root@...` — Permission denied

## Supabase Vault

API ключи хранятся в Supabase Vault, не в .env файлах.
Vault path: `D:\MVProfi\AI агентство\Разработка приложений\HH\vault_supabase`
