import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export function sleep() {
	return new Promise((res) => setTimeout(res, 1000)
	)
}
