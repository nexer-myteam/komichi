import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';
import starlightThemeNova from 'starlight-theme-nova';
import starlightTags from 'starlight-tags';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import plantuml from 'astro-plantuml';
import { loadEnv } from "vite";

const isDev = import.meta.env.DEV;
const env = loadEnv(process.env.NODE_ENV, process.cwd(), "");

export default defineConfig({
    site: 'https://nexer-myteam.github.io',
    base: '/komichi',
    integrations: [
        plantuml({
            serverUrl: isDev ? 'http://localhost:8080/plantuml/png/' : env.PLANT_UML_SERVER_URL,
            timeout: isDev ? 30000 : 10000,
            addWrapperClasses: true,
            language: 'plantuml'
        }),
        starlight({
            title: 'komichi',
            description: 'komichi - one step, one concept, one insight at a time!',
            favicon: '/komichi/images/favicon.svg',
            head: [
                // Add ICO favicon fallback for Safari.
                {
                    tag: 'link',
                    attrs: {
                        rel: 'icon',
                        href: '/komichi/images/favicon.ico',
                        sizes: '32x32',
                    },
                },
            ],
            logo: {
                replacesTitle: true,
                light: './src/assets/komichi_light_theme.png',
                dark: './src/assets/komichi_dark_theme.png',
            },
            // Set English as the default language for this site.
            defaultLocale: 'en',
            locales: {
                root: {label: 'English', lang: 'en'}
            },
            social: [{icon: 'github', label: 'GitHub', href: 'https://github.com/nexer-myteam/komichi'}],
            customCss: ['./src/styles/custom.css'],
            components: {
                MarkdownContent: './src/overrides/MarkdownContent.astro',
                Sidebar: './src/components/Sidebar.astro',
            },
            plugins: [
                starlightTags({
                    configPath: 'config/tags.yml',
                    tagsPagesPrefix: 'tags',
                    tagsIndexSlug: 'tags',
                    onInlineTagsNotFound: 'error',
                    itemsPerPage: 12,
                }),
                starlightSidebarTopics([
                    {
                        label: 'Home',
                        link: 'home/what-u-find-here/',
                        icon: 'information',
                        items: ['home/about', 'home/repository-structure','home/what-is-installed', 'home/what-u-find-here'],
                    },
                    {
                        label: 'Guides',
                        link: 'guides/intro',
                        icon: 'open-book',
                        items: [
                            { label: 'Recipes', autogenerate: { directory: 'guides' } },
                        ],
                    },
                    {
                        label: 'Resources',
                        link: 'resources/intro',
                        icon: 'document',
                        items: [
                            {
                                label: 'Astro',
                                collapsed: true,
                                items: [
                                    {
                                        label: 'Guides',
                                        items: [
                                            {
                                                label: 'Pages',
                                                link: 'https://docs.astro.build/en/basics/astro-pages/',
                                            },
                                            {
                                                label: 'Markdown',
                                                link: 'https://docs.astro.build/en/guides/markdown-content/',
                                            },
                                            {
                                                label: 'Content collections',
                                                link: 'https://docs.astro.build/en/guides/content-collections/',
                                            }
                                        ],
                                    },
                                    {
                                        label: 'Integrations',
                                        link: 'https://astro.build/integrations/',
                                    }
                                ],
                            },
                            {
                                label: 'Starlight',
                                collapsed: true,
                                items: [
                                    {
                                        label: 'Guides',
                                        items: [
                                            {
                                                label: 'Pages',
                                                link: 'https://starlight.astro.build/guides/pages/',
                                            },
                                            {
                                                label: 'Authoring Content in Markdown',
                                                link: 'https://starlight.astro.build/guides/authoring-content/',
                                            },
                                            {
                                                label: 'Using Components',
                                                link: 'https://starlight.astro.build/components/using-components/',
                                            },
                                            {
                                                label: 'Icons Reference',
                                                link: 'https://starlight.astro.build/reference/icons/',
                                            }
                                        ],
                                    },
                                    {
                                        label: 'Plugins',
                                        link: 'https://starlight.astro.build/resources/plugins/',
                                    },
                                    {
                                        label: 'Themes',
                                        link: 'https://starlight.astro.build/resources/themes/',
                                    }
                                ],
                            },
                            {
                                label: 'Starlight Blog',
                                collapsed: true,
                                items: [
                                    {
                                        label: 'Getting started',
                                        link: 'https://starlight-blog-docs.vercel.app/getting-started/',
                                    },
                                    {
                                        label: 'Demo blog',
                                        link: 'https://starlight-blog-docs.vercel.app/blog/',
                                    }
                                ],
                            },
                            {
                                label: 'Starlight Tags',
                                collapsed: true,
                                items: [
                                    {
                                        label: 'Getting started',
                                        link: 'https://frostybee.github.io/starlight-tags/getting-started/'
                                    },
                                    {
                                        label: 'Defining Tags Schema',
                                        link: 'https://frostybee.github.io/starlight-tags/guides/tags-definition/',
                                    }
                                ],
                            },
                            {
                                label: 'Starlight Theme Nova',
                                collapsed: true,
                                items: [
                                    {
                                        label: 'Getting started',
                                        link: 'https://starlight-theme-nova.pages.dev/guide/getting-started/'
                                    },
                                    {
                                        label: 'CSS & Styling',
                                        link: 'https://starlight-theme-nova.pages.dev/guide/css-and-styling/',
                                    }
                                ],
                            },
                            {
                                label: 'Starlight PlantUML',
                                collapsed: true,
                                items: [
                                    {
                                        label: 'Getting started',
                                        link: 'https://astro-starlight-plantuml-demo.netlify.app/installation/'
                                    },
                                    {
                                        label: 'Custom PlantUML Server',
                                        link: 'https://astro-starlight-plantuml-demo.netlify.app/configuration/#custom-plantuml-server',
                                    }
                                ],
                            },
                        ],
                    },
                ], {
                    exclude: ['/blog', '/blog/**/*', '/tags', '/tags/**']
                }),
                starlightThemeNova({
                    nav: [
                        {label: 'About', href: '/komichi/home/about'},
                        {label: 'Blog', href: '/komichi/blog'},
                        {label: 'NexerGroup', href: 'https://nexergroup.com'},
                    ],
                }),
                starlightBlog({
                    navigation: 'none',
                    authors: {
                        cestrada: {
                            name: 'Carlos Estrada',
                            title: 'Software developer',
                        },
                    },
                })
            ],
        }),
    ],
});
