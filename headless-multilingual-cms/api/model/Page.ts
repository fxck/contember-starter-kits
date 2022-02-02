import { SchemaDefinition as def } from '@contember/schema-definition'
import { ContentBlock } from './ContentBlock'
import { Link } from './Link'
import { Locale } from './Locale'
import { Seo } from './Seo'

export const PageTypeEnum = def.createEnum('homePage', 'blogPage', 'error404Page')

export class Page {
	locales = def.oneHasMany(PageLocale, 'root')
	role = def.enumColumn(PageTypeEnum).unique().nullable()
}

@def.Unique('root', 'locale')
@def.Unique('slug', 'locale')
export class PageLocale {
	root: def.ManyHasOneDefinition = def.manyHasOne(Page, 'locales').notNull().cascadeOnDelete()
	locale = def.manyHasOne(Locale, 'pages').cascadeOnDelete().notNull()

	publishAt = def.dateTimeColumn().default('now')
	slug = def.stringColumn()
	linkedFrom = def.oneHasMany(Link, 'page')
	blocks = def.oneHasMany(ContentBlock, 'page').orderBy('order')
	seo = def.oneHasOne(Seo, 'page').cascadeOnDelete()
}
