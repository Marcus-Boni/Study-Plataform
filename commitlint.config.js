import { RuleConfigSeverity } from "@commitlint/types";

/**
 * Conventional Commits + prompt do czg (cz-git lê a chave `prompt` daqui,
 * então tipos e vocabulário ficam em um único lugar).
 *
 * @type {import("@commitlint/types").UserConfig}
 */
export default {
	extends: ["@commitlint/config-conventional"],

	rules: {
		"type-enum": [
			RuleConfigSeverity.Error,
			"always",
			[
				"feat",
				"fix",
				"perf",
				"refactor",
				"style",
				"docs",
				"test",
				"build",
				"ci",
				"chore",
				"revert",
			],
		],
		// config-conventional proíbe sentence-case; liberado aqui porque
		// descrições em pt-BR quase sempre começam com maiúscula.
		"subject-case": [
			RuleConfigSeverity.Error,
			"never",
			["start-case", "pascal-case", "upper-case"],
		],
		"header-max-length": [RuleConfigSeverity.Error, "always", 100],
		"body-max-line-length": [RuleConfigSeverity.Error, "always", 100],
	},

	prompt: {
		useEmoji: false,
		allowCustomScopes: true,
		allowEmptyScopes: true,
		skipQuestions: ["footerPrefix", "footer"],

		messages: {
			type: "Selecione o tipo da mudança:",
			scope: "Informe o escopo da mudança (opcional):",
			customScope: "Informe o escopo da mudança:",
			subject: "Escreva uma descrição curta e imperativa da mudança:\n",
			body: 'Descrição mais detalhada (opcional). Use "|" para quebrar linha:\n',
			breaking:
				'Liste as BREAKING CHANGES (opcional). Use "|" para quebrar linha:\n',
			confirmCommit: "Confirmar o commit acima?",
			generatingByAI: "Gerando descrição com IA...",
			generatedSelectByAI: "Selecione uma descrição gerada por IA:",
		},

		types: [
			{ value: "feat", name: "feat:      ✨  Nova funcionalidade" },
			{ value: "fix", name: "fix:       🐛  Correção de bug" },
			{ value: "perf", name: "perf:      ⚡  Ganho de performance" },
			{
				value: "refactor",
				name: "refactor:  ♻️   Refatoração sem mudar comportamento",
			},
			{ value: "style", name: "style:     💄  Formatação, espaços, CSS puro" },
			{ value: "docs", name: "docs:      📝  Documentação" },
			{ value: "test", name: "test:      ✅  Testes" },
			{ value: "build", name: "build:     📦  Build, deps ou bundler" },
			{ value: "ci", name: "ci:        🤖  Pipelines e automações" },
			{ value: "chore", name: "chore:     🔧  Manutenção sem impacto em src" },
			{ value: "revert", name: "revert:    ⏪  Reverte um commit anterior" },
		],
	},
};
