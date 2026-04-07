# Protected Behavior Contract — CHG-V9_1-PILOT

> Shared surface: PRODUCT_SURFACE_STATE.yaml
> Чтение: enhance.md Step 3, verify.md Step 2

## Protected Behaviors

Следующие behaviors ДОЛЖНЫ быть сохранены после изменения:

- [ ] Файл остаётся valid YAML (parseable)
- [ ] Все 3 surface groups присутствуют (human_layer, machine_layer, root_files)
- [ ] Каждый surface имеет status и path/components
- [ ] known_gaps секция существует (может быть обновлена)
- [ ] protected_behaviors секция существует (может быть обновлена)
- [ ] product_name остаётся "V9 OSUI"
- [ ] last_updated обновлён на текущую дату
- [ ] Ни один active surface не удалён
- [ ] Ни один путь (path) не изменён

## Boundaries

| Можно менять | Нельзя менять |
|-------------|--------------|
| count полей (scripts, templates) | Имя product_name |
| status полей | Структуру surface groups |
| description полей | Путь path у surfaces |
| known_gaps содержимое | Удалять surfaces |
| protected_behaviors содержимое | Формат YAML (ключевые поля) |
