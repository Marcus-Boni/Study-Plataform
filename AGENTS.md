# study-plataform

## Agent skills

### Issue tracker

Issues and specs live as markdown files under `.scratch/<feature-slug>/` in this repo. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles, used verbatim as label strings. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Commits e releases

O repo usa **Conventional Commits**, validados pelo hook `commit-msg` — uma mensagem fora do padrão é rejeitada pelo Git.

- Formato: `<tipo>(<escopo opcional>): <descrição no imperativo>`
- Tipos permitidos: `feat`, `fix`, `perf`, `refactor`, `style`, `docs`, `test`, `build`, `ci`, `chore`, `revert`
- Descrição em pt-BR pode começar com maiúscula; `Start-Case`, `PascalCase` e `MAIÚSCULAS` são rejeitados
- Header até 100 caracteres
- `feat` → bump minor, `fix`/`perf`/`refactor` → patch, `BREAKING CHANGE:` no corpo → major

Para commitar, prefira `bun run commit` (prompt guiado do `czg`, já em pt-BR). Fonte única de verdade dos tipos: `commitlint.config.js`.

### Hooks (husky)

| Hook         | Roda                                        |
| ------------ | ------------------------------------------- |
| `pre-commit` | `lint-staged` → `biome check --write`       |
| `commit-msg` | `commitlint`                                |
| `pre-push`   | `tsc --noEmit`                              |

Para pular em uma emergência: `HUSKY=0 git commit …`. Não é o caminho normal.

### Release

`bun run release` lê os commits desde a última tag, calcula o semver, atualiza `CHANGELOG.md`, faz o commit `chore(release): vX.Y.Z` e cria a tag. Use `bun run release:dry` para inspecionar antes. Seções do changelog: `.versionrc.json`.
