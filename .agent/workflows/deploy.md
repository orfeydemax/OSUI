---
description: Deploy to production — execution step within /release workflow (V8 §10.8, §29)
---

# /deploy — Production Deployment

> V8: This is the **execution step** within the `/release` workflow.
> Reference: §10.8, §29

$ARGUMENTS

---

## Purpose

Execute the actual deployment to production or target environment. This is a sub-step of `/release`, handling the technical deployment process with pre-flight checks, deployment execution, and post-deploy verification.

---

## Sub-commands

```
/deploy            - Interactive deployment wizard (полный цикл)
/deploy check      - Run pre-deployment checks only (без деплоя)
/deploy preview    - Deploy to preview/staging
/deploy production - Deploy to production
/deploy rollback   - Rollback to previous version
```

---

## Prerequisites (V8 gates)
- `/release` workflow is active
- `gates.release_approval: approved`
- Release Note created
- Observation contract defined

---

## Steps

### 1. Pre-Deploy Checklist

Перед любым деплоем — пройти чеклист:

```markdown
## 🚀 Pre-Deploy Checklist

### Code Quality
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] ESLint passing (`npx eslint .`)
- [ ] All tests passing (`npm test`)

### Security
- [ ] No hardcoded secrets in code
- [ ] Environment variables documented and set
- [ ] Dependencies audited (`npm audit`)

### Performance
- [ ] Bundle size acceptable
- [ ] No console.log statements in production code
- [ ] Images optimized

### V8 Gates
- [ ] All verification evidence attached
- [ ] Rollback plan documented (if stateful)
- [ ] No blockers in Change Card

### Ready to deploy? (y/n)
```

### 2. Build Application
- Run production build
- Verify build output
- Check for warnings/errors

### 3. Execute Deployment

Deploy using the project's deployment method:

| Platform | Command | Notes |
|----------|---------|-------|
| **Docker (self-hosted)** | `docker compose up -d --build` | Наш основной метод |
| Docker (manual tar) | `tar → scp → extract → docker build → docker restart` | Для hotfix без CI/CD |
| Cloud Run | `gcloud run deploy` | Если настроен GCP |
| Vercel | `vercel --prod` | Auto-detected для Next.js |
| Manual | Step-by-step server commands | Крайний случай |

**Наш текущий deploy pipeline (Docker / VPS):**
```bash
# 1. Собрать архив во временной папке (согласно правилу о временных файлах)
mkdir -p .tmp/
tar -czf .tmp/deploy.tar.gz src/ public/ package.json Dockerfile docker-compose.yml

# 2. Загрузить на сервер
scp -i ~/.ssh/openclaw_vps .tmp/deploy.tar.gz deploy@116.118.9.78:~/kineziolog/

# 3. На сервере: распаковать и пересобрать
ssh deploy@server "cd ~/kineziolog && tar -xzf deploy.tar.gz"
sudo docker build -t prototype-kineziolog-app .
sudo docker restart kineziolog-app

# 4. Удалить локальный отработанный архив
rm -f .tmp/deploy.tar.gz

# 5. Проверить статус
sudo docker ps --filter name=kineziolog-app
sudo docker logs kineziolog-app --tail 20
```

### 4. Post-Deploy Health Check

**Обязательные проверки после деплоя:**

```markdown
### Health Check
- [ ] Контейнер работает (`docker ps`)
- [ ] Нет ошибок в логах (`docker logs --tail 50`)
- [ ] Главная страница отвечает (HTTP 200)
- [ ] API-эндпоинты отвечают (HTTP 200)
- [ ] Админка доступна и авторизация работает
- [ ] БД доступна (Supabase health check)
```

### 5. Start Observation
- `observation_status: in_progress`
- Monitor for normal signals defined in Release Note
- Watch for escalation triggers

### 6. Update Change Card
- Record deployment timestamp
- Update `stage: release`
- Set `observation_status: in_progress`

---

## Deployment Flow

```
┌─────────────────┐
│  /deploy        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Pre-flight     │
│  checklist      │
└────────┬────────┘
         │
    Pass? ──No──► Fix issues first
         │
        Yes
         │
         ▼
┌─────────────────┐
│  Build          │
│  application    │
└────────┬────────┘
         │
    OK?  ──No──► Fix build errors
         │
        Yes
         │
         ▼
┌─────────────────┐
│  Deploy to      │
│  server/cloud   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Health check   │
│  & verify       │
└────────┬────────┘
         │
    OK?  ──No──► Rollback!
         │
        Yes
         │
         ▼
┌─────────────────┐
│  ✅ Complete    │
│  → Observation  │
└─────────────────┘
```

---

## Output Format

### Successful Deploy

```markdown
## 🚀 Deployment Complete

### Summary
- **Environment:** production
- **Duration:** ~60 seconds
- **Platform:** Docker (self-hosted VPS)
- **Timestamp:** 2026-03-31T16:30:00+07:00

### URLs
- 🌐 Production: https://devkinezio.mvprofi.org
- 🔐 Admin: https://devkinezio.mvprofi.org/admin

### What Changed
- [Список изменений]

### Health Check
✅ Container running (Up 5 seconds)
✅ Main page responding (200 OK)
✅ Admin panel accessible
✅ Database connected
✅ No errors in logs
```

### Failed Deploy

```markdown
## ❌ Deployment Failed

### Error
[Описание ошибки]

### Details
```
[error log output]
```

### Resolution
1. [Шаги для исправления]
2. Run `npm run build` locally to verify
3. Try `/deploy` again

### Rollback
Previous version is still active.
Run `/deploy rollback` if needed.
```

---

## Rollback Procedure

```bash
# Вариант 1: Docker restart с предыдущим образом
sudo docker images prototype-kineziolog-app --format "{{.ID}} {{.CreatedAt}}" | head -3
sudo docker tag prototype-kineziolog-app:latest prototype-kineziolog-app:broken
# ... восстановить предыдущий код и пересобрать

# Вариант 2: Git revert (если используется)
git revert HEAD
git push origin main

# Вариант 3: Восстановление из бэкапа
# Держать предыдущий tar-архив на сервере
```

**Правило:** Rollback-план должен быть готов ДО деплоя, а не после обнаружения проблемы.

---

## Examples

```
/deploy                          # Полный цикл деплоя
/deploy check                    # Только проверки, без деплоя
/deploy preview                  # Деплой на staging
/deploy production               # Деплой на прод
/deploy production --skip-tests  # Hotfix: без тестов (только если sev1)
/deploy rollback                 # Откат к предыдущей версии
```

---

## Important

> `/deploy` is part of the `/release` lifecycle. Always run it within the `/release` context, never as a standalone action without a Change Card.
>
> **Exception:** Hotfix track — допускается standalone `/deploy` при `prod_incident: yes`.

---

## Forbidden
- ❌ Deploy без pre-flight checklist
- ❌ Deploy на production без health check после
- ❌ Deploy без rollback plan для stateful changes
- ❌ Игнорирование ошибок в логах после деплоя

## Context Budget
- **Class: Medium** — read change card, deployment config, environment setup
