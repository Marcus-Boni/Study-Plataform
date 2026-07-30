import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

/**
 * Fonte única das variáveis de ambiente. Importe `env` daqui em vez de tocar
 * `process.env` / `import.meta.env` direto — assim uma variável faltando explode
 * no boot com mensagem clara, e não em runtime com `undefined`.
 *
 * Onde declarar cada variável:
 * - `server`: só existe no servidor. Acessar no cliente lança erro (é assim que
 *   segredo não vaza pro bundle).
 * - `client`: exposto ao browser, exige o prefixo `VITE_`.
 * - `shared`: existe nos dois lados.
 */
export const env = createEnv({
	clientPrefix: "VITE_",

	shared: {
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
	},

	// Segredos e configuração de backend. Ex.:
	// DATABASE_URL: z.string().url(),
	// SESSION_SECRET: z.string().min(32),
	server: {},

	// Configuração pública. Ex.:
	// VITE_API_URL: z.string().url(),
	client: {},

	runtimeEnv: import.meta.env,

	// Trata `FOO=` como ausente, para o `.default()` valer.
	emptyStringAsUndefined: true,
});
