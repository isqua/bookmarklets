import { promises as fs } from 'node:fs';
import path from 'path';
import esbuild from 'esbuild';
import sections from '../index.json';

import type { Loader } from 'astro/loaders';

export const bookmarkletsLoader = (): Loader => {
    return {
        name: 'bookmarklets-loader',
        load: async ({ logger, generateDigest, store }) => {
            const dirname = path.dirname(import.meta.url.replace('file://', ''));
            const bookmarkletsDir = path.resolve(dirname, '../bm/');

            const files: string[] = [];

            sections.forEach(section => {
                section.content.forEach(bookmarklet => {
                    files.push(`${section.id}/${bookmarklet.id}`)
                })
            })

            files.forEach(async entry => {
                const filePath = path.resolve(bookmarkletsDir, `${entry}.js`);

                const contents = await fs.readFile(filePath, 'utf-8').catch((err) => {
                    logger.error(`Error reading ${entry}: ${err.message}`);
                    return;
                });

                if (!contents && contents !== '') {
                    logger.warn(`No contents found for ${entry}`);
                    return;
                }

                const res = await esbuild.transform(contents, {
                    minify: true,
                    loader: 'js',
                });
                const code = 'javascript:' + encodeURIComponent(res.code);
                const digest = generateDigest(code);

                logger.info('parsed bookmark: ' + `${entry}`);

                store.set({
                    id: entry,
                    data: { id: entry, code },
                    digest,
                });
            })
        }
    }
};
