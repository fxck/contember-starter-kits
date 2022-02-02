import * as React from 'react'
import {
	CreatePage,
	DataBindingProvider,
	DataGrid,
	DataGridPage,
	EditPage,
	EntityAccessor,
	EnumCell,
	LayoutRenderer,
	Link,
	LinkButton,
	TextCell,
	FeedbackRenderer,
	useCurrentRequest
} from '@contember/admin'
import { PageForm, PageSideForm } from '../forms/pageForms'
import locale from '../locales'
import { UrlCell } from '../components/UrlCell'

function clearSlugWhenPageHasRole(getEntityAccessor: EntityAccessor.GetEntityAccessor) {
	const entity = getEntityAccessor()
	if (entity.getField('role').value !== null) {
		entity.getField('locales(locale.code = $locale).slug').updateValue(null)
	}
}

export const PageList = () => {
	const request = useCurrentRequest()

	return (
		<DataGridPage
			entities="Page"
			itemsPerPage={50}
			rendererProps={{ title: locale['Pages'], actions: <LinkButton to="pageCreate">{locale['Add page']}</LinkButton> }}
		>
			{request?.dimensions.locale.map(localeCode => (
				<TextCell
					field={`locales(locale.code = '${localeCode}').seo.title`}
					header={`${locale["Title"]} (${localeCode})`}
					format={(scalar) => <Link to="pageEdit(id: $entity.id)">{scalar}</Link>}
				/>
			))}
			<EnumCell
				field="role"
				header={locale["Role"]}
				options={{
					homePage: locale["Home page"],
					error404Page: locale["Error 404"],
					blogPage: locale["Blog page"],
				}}
			/>
			{request?.dimensions.locale.map(localeCode => (
				<UrlCell field={`locales(locale.code = '${localeCode}').slug`} header={`${locale["Url"]} (${localeCode})`} />
			))}
		</DataGridPage>
	)
}

export const PageCreate = (
	<CreatePage
		entity="Page"
		rendererProps={{ title: locale["Add page"], side: <PageSideForm /> }}
		redirectOnSuccess="pageEdit(id: $entity.id)"
		onBeforePersist={(entityAccessor) => clearSlugWhenPageHasRole(entityAccessor)}
	>
		<PageForm />
	</CreatePage>
)

export const PageEdit = (
	<EditPage
		entity="Page(id=$id)"
		rendererProps={{ title: locale["Edit page"], side: <PageSideForm isEditPage /> }}
		onBeforePersist={(entityAccessor) => clearSlugWhenPageHasRole(entityAccessor)}
	>
		<PageForm />
	</EditPage>
)
